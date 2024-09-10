// This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

/** user-defined commands **/

export const commands = {
  async workbenchGetState(): Promise<Result<WorkbenchState, string>> {
    try {
      return { status: "ok", data: await TAURI_INVOKE("workbench_get_state") };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async createProject(input: CreateProjectInput): Promise<Result<ProjectDTO | null, string>> {
    try {
      return { status: "ok", data: await TAURI_INVOKE("create_project", { input }) };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async restoreSession(projectSource: string | null): Promise<Result<SessionInfoDTO | null, string>> {
    try {
      return { status: "ok", data: await TAURI_INVOKE("restore_session", { projectSource }) };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async appReady(): Promise<void> {
    await TAURI_INVOKE("app_ready");
  },
  async updateFontSize(input: number): Promise<Result<null, string>> {
    try {
      return { status: "ok", data: await TAURI_INVOKE("update_font_size", { input }) };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async fetchAllThemes(): Promise<Result<string[], string>> {
    try {
      return { status: "ok", data: await TAURI_INVOKE("fetch_all_themes") };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async readTheme(themeName: string): Promise<Result<string, string>> {
    try {
      return { status: "ok", data: await TAURI_INVOKE("read_theme", { themeName }) };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: "error", error: e as any };
    }
  },
  async nativePlatformInfo(): Promise<NativePlatformInfo> {
    return await TAURI_INVOKE("native_platform_info");
  },
};

/** user-defined events **/

/** user-defined constants **/

/** user-defined types **/

export type CreateProjectInput = { source: string; repository: string | null };
export type NativePlatformInfo = { os: string; version: string; hostname: string };
export type ProjectDTO = { id: string; source: string; repository: string | null; created_at: string };
export type SessionDTO = { id: string };
export type SessionInfoDTO = { created_at: string; project: ProjectDTO; session: SessionDTO };
export type WorkbenchState = "Empty" | "Workspace";

/** tauri-specta globals **/

import { invoke as TAURI_INVOKE, Channel as TAURI_CHANNEL } from "@tauri-apps/api/core";
import * as TAURI_API_EVENT from "@tauri-apps/api/event";
import { type WebviewWindow as __WebviewWindow__ } from "@tauri-apps/api/webviewWindow";

type __EventObj__<T> = {
  listen: (cb: TAURI_API_EVENT.EventCallback<T>) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
  once: (cb: TAURI_API_EVENT.EventCallback<T>) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
  emit: T extends null
    ? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit>
    : (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};

export type Result<T, E> = { status: "ok"; data: T } | { status: "error"; error: E };

function __makeEvents__<T extends Record<string, any>>(mappings: Record<keyof T, string>) {
  return new Proxy(
    {} as unknown as {
      [K in keyof T]: __EventObj__<T[K]> & {
        (handle: __WebviewWindow__): __EventObj__<T[K]>;
      };
    },
    {
      get: (_, event) => {
        const name = mappings[event as keyof T];

        return new Proxy((() => {}) as any, {
          apply: (_, __, [window]: [__WebviewWindow__]) => ({
            listen: (arg: any) => window.listen(name, arg),
            once: (arg: any) => window.once(name, arg),
            emit: (arg: any) => window.emit(name, arg),
          }),
          get: (_, command: keyof __EventObj__<any>) => {
            switch (command) {
              case "listen":
                return (arg: any) => TAURI_API_EVENT.listen(name, arg);
              case "once":
                return (arg: any) => TAURI_API_EVENT.once(name, arg);
              case "emit":
                return (arg: any) => TAURI_API_EVENT.emit(name, arg);
            }
          },
        });
      },
    }
  );
}
