import { invokeTauriIpc, IpcResult } from "@/lib/backend/tauri";
import { AppStateInfo, LocaleDescriptor, ThemeDescriptor } from "@repo/moss-desktop";
import { invoke } from "@tauri-apps/api/core";

export interface GetColorThemeOptions {
  enableCache: boolean;
}

export const getColorTheme = async (
  source: string,
  opts?: GetColorThemeOptions
): Promise<IpcResult<string, string>> => {
  return await invokeTauriIpc<string, string>("get_color_theme", {
    path: source,
    opts,
  });
};

export const getColorThemes = async (): Promise<ThemeDescriptor[]> => {
  return await invoke<ThemeDescriptor[]>("get_themes");
};

export const getState = async (): Promise<AppStateInfo> => {
  return await invoke<AppStateInfo>("get_state");
};
