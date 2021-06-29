import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const MachineContext = createContext();

let globalMachine;

export default function MachineProvider(props) {
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    globalMachine = new props.Machine();
    globalMachine.init();
    setMachine(globalMachine);

    return () => {
      globalMachine.dispose();
    };
  }, [props.Machine]);

  return (
    <MachineContext.Provider value={{ machine }}>
      {machine && props.children}
    </MachineContext.Provider>
  );
}
