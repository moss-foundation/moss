use platform_core::common::context::async_context::AsyncContext;
use tauri::{AppHandle, Manager, State};
use workbench_tgui::WorkbenchState;

use crate::service::project_service::{CreateProjectInput, ProjectDTO};
use crate::service::session_service::SessionInfoDTO;
use crate::AppState;

#[tauri::command(async)]
#[specta::specta]
pub async fn fetch_all_themes(state: State<'_, AppState<'_>>) -> Result<Vec<String>, String> {
    Ok(vec![
        "moss-dark".to_string(),
        "moss-light".to_string(),
        "moss-pink".to_string(),
    ])
}

#[tauri::command(async)]
#[specta::specta]
pub async fn read_theme(
    state: State<'_, AppState<'_>>,
    file_path: String,
) -> Result<String, String> {
    match std::fs::read_to_string(file_path) {
        Ok(content) => Ok(content),
        Err(err) => Err(format!("filed to read theme file: {err}")),
    }
}

#[tauri::command(async)]
#[specta::specta]
pub async fn update_font_size(
    async_ctx: State<'_, AsyncContext>,
    state: State<'_, AppState<'_>>,
    input: i32,
) -> Result<(), String> {
    async_ctx.with_mut(|ctx| {
        state.workbench.update(ctx, |this, cx| {
            this.update_conf(cx, input as usize).unwrap();
            cx.notify();
        });

        Ok(())
    })
}

#[tauri::command(async)]
#[specta::specta]
pub async fn app_ready(app_handle: AppHandle) {
    let window = app_handle.get_webview_window("main").unwrap();
    window.show().unwrap();
}

#[tauri::command(async)]
#[specta::specta]
pub async fn create_project(
    state: State<'_, AppState<'_>>,
    input: CreateProjectInput,
) -> Result<Option<ProjectDTO>, String> {
    match state.project_service.create_project(&input).await {
        Ok(Some(project)) => return Ok(Some(project.into())),
        Ok(None) => return Ok(None),
        Err(e) => {
            let err = format!("An error occurred while creating the project: {e}");
            error!(err);
            return Err(err);
        }
    }
}

#[tauri::command(async)]
#[specta::specta]
pub async fn workbench_get_state(state: State<'_, AppState<'_>>) -> Result<WorkbenchState, String> {
    Ok(WorkbenchState::Empty)
}

#[tauri::command(async)]
#[specta::specta]
pub async fn restore_session(
    state: State<'_, AppState<'_>>,
    project_source: Option<String>,
) -> Result<Option<SessionInfoDTO>, String> {
    match state.session_service.restore_session(project_source).await {
        Ok(Some(session_info)) => return Ok(Some(session_info.into())),
        Ok(None) => return Ok(None),
        Err(e) => {
            let err = format!("An error occurred while restoring the session: {e}");
            error!(err);
            return Err(err);
        }
    }
}
