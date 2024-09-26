import { ContentLayout, Menu, RootLayout } from "@/components";
import "@/i18n";
import "@repo/ui/src/fonts.css";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Resizable, ResizablePanel } from "./components/Resizable";
import Sidebar from "./components/Sidebar";
import { Home, Logs, Settings } from "./components/pages";
import { RootState, useAppDispatch } from "./store";
import { setLanguageFromLocalStorage } from "./store/languages/languagesSlice";
import { initializeThemes } from "./store/themes";
import DraggableAccordion from "./components/DraggableAccordion";
import { setAccordion } from "./store/accordion/accordionSlice";
import { swapByIndex } from "./store/accordion/accordionHelpers";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import SidebarHeader from "./components/SidebarHeader";

function App() {
  const dispatch = useAppDispatch();
  const [sideBarVisible] = useState(true);
  const selectedTheme = useSelector((state: RootState) => state.themes.selected);
  const accordion = useSelector((state: RootState) => state.accordion.accordion);

  useEffect(() => {
    dispatch(setLanguageFromLocalStorage());
    dispatch(initializeThemes());
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const destinationLocation = destination.data.location as number;
        const sourceLocation = source.data.location as number;

        if (
          destinationLocation === undefined ||
          sourceLocation === undefined ||
          destinationLocation === sourceLocation
        ) {
          return;
        }

        const updatedArray = swapByIndex(accordion, sourceLocation, destinationLocation);

        dispatch(setAccordion(updatedArray));
      },
    });
  }, [accordion]);

  const handleAccordionClick = (index: number) => {
    const updatedAccordion = accordion.map((accordion, i) =>
      i === index ? { ...accordion, isOpen: !accordion.isOpen } : accordion
    );

    dispatch(setAccordion(updatedAccordion));
  };

  return (
    <>
      {!selectedTheme ? (
        <div className="relative min-h-screen flex bg-storm-800">
          <div className="container max-w-screen-xl mx-auto flex justify-center items-center text-4xl text-white">
            Loading...
          </div>
        </div>
      ) : (
        <RootLayout>
          <Resizable proportionalLayout={false}>
            <ResizablePanel minSize={100} preferredSize={255} snap visible={sideBarVisible} className="select-none">
              <SidebarHeader title="launchpad" />
              {accordion.map((accordion, index) => (
                <DraggableAccordion
                  key={index}
                  title={accordion.title}
                  location={index}
                  isOpen={accordion?.isOpen}
                  handleClick={() => handleAccordionClick(index)}
                >
                  {accordion.content === "Sidebar" ? <Sidebar /> : <div>{accordion.content}</div>}
                </DraggableAccordion>
              ))}
            </ResizablePanel>
            <ResizablePanel>
              <ContentLayout className="content relative flex flex-col overflow-auto h-full">
                <Suspense fallback="loading">
                  <BrowserRouter>
                    <Menu />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/logs" element={<Logs />} />
                    </Routes>
                  </BrowserRouter>
                </Suspense>
              </ContentLayout>
            </ResizablePanel>
          </Resizable>
        </RootLayout>
      )}
    </>
  );
}
export default App;
