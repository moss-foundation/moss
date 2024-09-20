import "@/i18n";
import "@repo/ui/src/fonts.css";
import { Settings, Content, Home, Menu, RootLayout, Sidebar, Logs } from "@/components";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Icon, MenuItem, IconTitle, ThemeProvider } from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Resizable, ResizablePanel } from "./components/Resizable";
import { Convert, Theme } from "@repo/theme";
import { commands } from "@/bindings";

const handleFetchAllThemes = async () => {
  try {
    let response = await commands.fetchAllThemes();
    if (response.status === "ok") {
      return response.data;
    }
    throw new Error("Failed to fetch themes: Invalid response status");
  } catch (error) {
    console.error("Failed to fetch themes:", error);
    throw error;
  }
};

const handleReadTheme = async (themeName: string): Promise<Theme> => {
  try {
    let response = await commands.readTheme(themeName);
    if (response.status === "ok") {
      return Convert.toTheme(response.data);
    }
    throw new Error("Failed to read theme: Invalid response status");
  } catch (error) {
    console.error("Failed to read theme:", error);
    throw error;
  }
};

enum IconState {
  Default = "group-text-[rgba(var(--color-primary))]",
  DefaultStroke = "group-stroke-zinc-500",
  Hover = "group-hover:text-[rgba(var(--color-primary))]",
  HoverStroke = "group-hover:stroke-zinc-600",
  Active = "text-[rgba(var(--color-primary))]",
  Disabled = "text-[rgba(var(--color-primary))] bg-opacity-50",
}

function App() {
  const [sideBarVisible, setSideBarVisibility] = useState(true);
  const { i18n } = useTranslation();
  const [themes, setThemes] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | undefined>(undefined);

  // Initialize theme
  useEffect(() => {
    const initializeThemes = async () => {
      try {
        const allThemes = await handleFetchAllThemes();
        if (allThemes) {
          setThemes(allThemes);
        }

        const savedThemeName = localStorage.getItem("theme");
        let themeToUse: Theme | undefined;

        if (savedThemeName) {
          themeToUse = await handleReadTheme(savedThemeName);
        }

        if (themeToUse) {
          setSelectedTheme(themeToUse);
        } else {
          localStorage.setItem("theme", themes[0]);
          setSelectedTheme(await handleReadTheme(themes[0]));
        }
      } catch (error) {
        console.error("Failed to initialize themes:", error);
      }
    };

    initializeThemes();
  }, []);

  // Initialize language
  useEffect(() => {
    const setLanguageFromLocalStorage = () => {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    setLanguageFromLocalStorage();
  }, [i18n]);

  // Handle theme change
  useEffect(() => {
    const handleStorageChange = async () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setSelectedTheme(await handleReadTheme(storedTheme));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [themes]);

  useEffect(() => {
    if (!selectedTheme) {
      console.error("Failed to initialize theme");
    }
  }, [selectedTheme]);

  return (
    <>
      {!selectedTheme ? (
        <div className="relative min-h-screen flex bg-storm-800">
          <div className="container max-w-screen-xl mx-auto flex justify-center items-center text-4xl text-white">
            Loading...
          </div>
        </div>
      ) : (
        <ThemeProvider themeOverrides={selectedTheme} updateOnChange>
          <RootLayout>
            <Resizable proportionalLayout={false}>
              <ResizablePanel minSize={100} preferredSize={255} snap visible={sideBarVisible}>
                <Sidebar className="p-0 h-full w-full overflow-auto">
                  <MenuItem className="group bg-zinc-200 mt-13 mb-3.5">
                    <Icon
                      icon="Search"
                      className={twMerge("h-4.5 w-4.5 min-w-4", IconState.Default, IconState.Hover)}
                    />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-xs" title="Search..." />
                    <Icon
                      icon="SearchShortcut"
                      className="min-w-4  w-4.5 fill-zinc-500 group-hover:fill-zinc-600  ml-auto pr-2"
                    />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="Home1" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-sm" title="Home" />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="Issues" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-sm" title="Issues" />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="Code" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-sm" title="Code" />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="Goals" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-sm" title="Goals" />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="Reports" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-sm" title="Reports" />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="Documentation" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle
                      className="text-[rgba(var(--color-primary))] text-sm"
                      title="Documentation with very long title to trigger overflow X"
                    />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="Settings" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-sm" title="Settings" />
                  </MenuItem>

                  <MenuItem className="group">
                    <Icon icon="QuickSearch" className={twMerge(IconState.Default, IconState.Hover, "min-w-4")} />
                    <IconTitle className="text-[rgba(var(--color-primary))] text-sm" title="Quick Search" />
                  </MenuItem>
                </Sidebar>
              </ResizablePanel>
              <ResizablePanel>
                <Content className="content relative flex flex-col overflow-auto h-full">
                  <Suspense fallback="loading">
                    <BrowserRouter>
                      <Menu />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/settings" element={<Settings themes={themes} />} />
                        <Route path="/logs" element={<Logs />} />
                      </Routes>
                    </BrowserRouter>
                  </Suspense>
                </Content>
              </ResizablePanel>
            </Resizable>
          </RootLayout>
        </ThemeProvider>
      )}
    </>
  );
}
export default App;
