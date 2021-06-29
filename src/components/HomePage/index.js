import React, { useEffect } from "react";
import CustomCarousel from "./Carousel";
import Main from "./Main";
import Footer from "./footer/Footer";
import { useService } from "@xstate/react";
import { useContext } from "react";
import { withProviders } from "../../utils/withProviders";
import MachineProvider, { MachineContext } from "../../contexts/machineContext";
import { HomeMachine } from "../../machines/homeMachine";

function HomePage() {
  const { machine } = useContext(MachineContext);
  const [, send] = useService(machine.createdMachine);

  useEffect(() => {
    send("READY");
  }, [send]);

  return (
    <>
      <CustomCarousel />
      <Main />
      <Footer />
    </>
  );
}

export default withProviders([MachineProvider, { Machine: HomeMachine }])(
  HomePage
);
