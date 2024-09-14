use smol::fs;
use std::{collections::HashMap, future::Future, io};

use anyhow::{anyhow, Result};
use clap::Parser;
use serde::Deserialize;
use toml::Value;

use tracing::{error, info, warn};

use cargo_metadata::Metadata;

#[derive(Parser)]
pub struct WorkspaceAuditCommandArgs {}

#[derive(Deserialize, Default)]
struct ConfigFile {
    #[serde(default)]
    rust_workspace_audit: RustWorkspaceAuditBlock,
}

#[derive(Deserialize, Default)]
struct RustWorkspaceAuditBlock {
    #[serde(default)]
    ignore: HashMap<String, Vec<String>>,
}

// pub type ProviderJobCallback = dyn FnOnce() -> (dyn Future<Output = Result<()>> Send + 'static);

pub(crate) struct RustWorkspaceAuditProvider {
    metadata: Metadata,
    jobs: Vec<Box<dyn Future<Output = Result<()>> + Send + 'static>>,
}

impl RustWorkspaceAuditProvider {
    pub fn new(metadata: Metadata) -> Self {
        Self {
            metadata,
            jobs: vec![],
        }
    }

    pub async fn run(&self) -> Result<()> {
        // 1. vec of tasks

        // let tasks = self.jobs.into_iter().map(|job| {
        //     // tokio::task::spawn(job)
        // }).collect::Vec<_>();

        // 2. wait for all tasks and handle result

        // for result in join_all(tasks).await {
        //     result.map_err(|err| anyhow!(err))??;
        // }

        unimplemented!()
    }

    pub fn insert_job(&mut self, job: impl Future<Output = Result<()>> + Send + 'static) {
        self.jobs.push(Box::new(job))
    }
}

pub async fn check_dependencies_job(
    _args: WorkspaceAuditCommandArgs,
    workspace: Metadata,
) -> Result<()> {
    // FIXME:
    let ignored_deps = load_ignored_dependencies("config.toml").await?;

    for package in workspace.workspace_packages() {
        info!("analyzing '{}'...", package.name);
        let cargo_toml_content = fs::read_to_string(&package.manifest_path).await?;
        let cargo_toml: Value = toml::from_str(&cargo_toml_content)?;

        if let Some(dependencies) = cargo_toml.get("dependencies").and_then(|d| d.as_table()) {
            for (dep_name, dep_value) in dependencies {
                if let Some(ignored_list) =
                    ignored_deps.rust_workspace_audit.ignore.get(&package.name)
                {
                    if ignored_list.contains(&dep_name) {
                        info!("ignoring {} dependency in '{}'", dep_name, package.name);
                        continue;
                    }
                }

                let is_workspace_dep = dep_value
                    .as_table()
                    .and_then(|t| t.get("workspace"))
                    .and_then(|w| w.as_bool())
                    .unwrap_or(false);

                if !is_workspace_dep {
                    error!(
                        "crate '{}' has non-workspace dependency: {}",
                        package.name, dep_name
                    );
                }
            }
        }
    }

    Ok(())
}

async fn load_ignored_dependencies(config_path: &str) -> Result<ConfigFile> {
    let content_str = match smol::fs::read_to_string(config_path).await {
        Ok(content) => content,
        Err(e) if e.kind() == io::ErrorKind::NotFound => {
            warn!("Config file not found, continuing without ignored dependencies.");
            return Err(anyhow!("File {config_path} is not wound"));
        }
        Err(e) => return Err(anyhow!(e)),
    };

    Ok(toml::from_str(&content_str)?)
}
