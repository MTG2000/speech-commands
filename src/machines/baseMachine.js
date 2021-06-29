import { cmds } from "../cmds/allCmds";
import { interpret } from "xstate";

class BaseMachine {
  cnts = {};
  machine = null; // the structure of the actual state machine
  externalActions = {};
  createdMachine;
  evntListener = null;

  init() {
    this.createdMachine = interpret(this.machine).onTransition((state) =>
      console.log(
        `${state.value} idx:${state.context.idx} cnt:${state.context.cnt}`
      )
    );
    this.createdMachine.start();

    this.evntListener = (e) => {
      const cmd = e.detail;
      switch (cmd) {
        case cmds.UP:
          this.createdMachine.send("UP");
          break;
        case cmds.DOWN:
          this.createdMachine.send("DOWN");
          break;
        case cmds.LEFT:
          this.createdMachine.send("LEFT");
          break;
        case cmds.RIGHT:
          this.createdMachine.send("RIGHT");
          break;
        case cmds.GO:
          this.createdMachine.send("ENTER");
          break;
        case cmds.ON:
          this.createdMachine.send("ON");
          break;
        case cmds.OFF:
          this.createdMachine.send("OFF");
          break;
        default:
          break;
      }
    };
    document.addEventListener("cmd", this.evntListener);
  }

  dispose() {
    this.createdMachine.stop();
    document.removeEventListener("cmd", this.evntListener);
  }

  setCnts(key, val) {
    this.cnts[key] = val;
  }

  setExternalActions(key, val) {
    this.externalActions[key] = val;
  }

  getCnts(key) {
    return this.cnts[key];
  }
}

export default BaseMachine;
