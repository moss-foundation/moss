use async_graphql::{Context, Object, Result as GraphqlResult};
use chrono::{Duration, Utc};
use common::id::NanoId;
use graphql_utl::path::Path as PathGraphQL;
use graphql_utl::GraphQLExtendError;
use tokio::sync::RwLock;

use crate::domain::{
    model::session::{Session, SessionEntity, SessionToken},
    service::{project_service::ProjectService, session_service::SessionService},
};

#[derive(Default)]
pub(super) struct SessionMutation;

#[Object]
impl SessionMutation {
    async fn create_session(
        &self,
        ctx: &Context<'_>,
        project_source: PathGraphQL,
    ) -> GraphqlResult<Session> {
        let session_service = ctx.data::<RwLock<SessionService>>()?;
        let project_service = ctx.data::<RwLock<Option<ProjectService>>>()?;

        let mut session_service_lock = session_service.write().await;
        let session_entity = session_service_lock
            .create_session(&project_source.into(), project_service)
            .await
            .extend_error()?;

        let session_token = SessionToken::try_from(session_entity.clone())?;

        Ok(Session {
            id: session_entity.id,
            token: session_token,
            project_meta: session_entity.project_meta,
            created_at: session_entity.created_at,
        })
    }

    async fn restore_session(
        &self,
        ctx: &Context<'_>,
        session_id: NanoId,
    ) -> GraphqlResult<Session> {
        let project_service = ctx.data::<RwLock<Option<ProjectService>>>()?;
        let mut session_service_lock = ctx.data::<RwLock<SessionService>>()?.write().await;
        let session_entity = session_service_lock
            .restore_session(session_id, project_service)
            .await
            .extend_error()?;

        let session_token = SessionToken::try_from(session_entity.clone())?;

        Ok(Session {
            id: session_entity.id,
            token: session_token,
            project_meta: session_entity.project_meta,
            created_at: session_entity.created_at,
        })
    }

    #[graphql(name = "getRecentSessions")]
    async fn get_recent(
        &self,
        ctx: &Context<'_>,
        #[graphql(default_with = "(Utc::now() - Duration::days(30)).timestamp()")] start_time: i64,
        #[graphql(validator(minimum = 1, maximum = 10), default = 10)] limit: u64,
    ) -> GraphqlResult<Vec<SessionEntity>> {
        let session_service_lock = ctx.data::<RwLock<SessionService>>()?.write().await;
        let result = session_service_lock
            .get_recent_list(start_time, limit)
            .await
            .extend_error()?;

        Ok(result)
    }
}
