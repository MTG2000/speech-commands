import BaseMachine from "./baseMachine";
import { createMachine, assign } from "xstate";

const actions = {
  inc: assign({ idx: (ctx) => (ctx.idx + 1) % ctx.cnt }),
  dec: assign({ idx: (ctx) => Math.max(0, ctx.idx - 1) }),
};

class HomeMachine extends BaseMachine {
  cnts = {
    articles: 7,
    slides: 3,
    recents: 3,
    recommendeds: 3,
  };
  externalActions = {
    enterBlog: () => {},
    enterRecommendedBlog: () => {},
    enterRecentBlog: () => {},
    sliderLeft: () => {},
    sliderRight: () => {},
  };
  machine = createMachine(
    {
      id: "home-machine",
      initial: "initial",
      context: {
        idx: 0,
        cnt: 0,
      },
      states: {
        initial: {
          on: {
            READY: "slider",
          },
        },

        slider: {
          entry: assign(() => ({ cnt: this.getCnts("slides"), idx: 0 })),
          on: {
            LEFT: {
              actions: ["dec", () => this.externalActions.sliderLeft()],
            },
            RIGHT: {
              actions: ["inc", () => this.externalActions.sliderRight()],
            },
            DOWN: {
              target: "articlesList",
            },
          },
        },
        articlesList: {
          entry: assign(() => ({ cnt: this.getCnts("articles"), idx: 0 })),
          on: {
            UP: [
              {
                actions: "dec",
                target: "slider",
                cond: "reachedTop",
              },
              {
                actions: "dec",
              },
            ],
            DOWN: [
              {
                actions: "inc",
              },
            ],
            RIGHT: {
              target: "recommendedArticles",
            },
            ENTER: {
              actions: (ctx) => this.externalActions.enterBlog(ctx),
            },
          },
        },
        recommendedArticles: {
          entry: assign(() => ({
            cnt: this.getCnts("recommendeds"),
            idx: 0,
          })),
          on: {
            UP: [
              {
                actions: "dec",
                target: "slider",
                cond: "reachedTop",
              },
              {
                actions: "dec",
              },
            ],
            DOWN: [
              {
                actions: "inc",
                target: "recentArticles",
                cond: "reachedBottom",
              },
              {
                actions: "inc",
              },
            ],
            LEFT: {
              target: "articlesList",
            },
            ENTER: {
              actions: (ctx) => this.externalActions.enterRecommendedBlog(ctx),
            },
          },
        },
        recentArticles: {
          entry: assign(() => ({ cnt: this.getCnts("recents"), idx: 0 })),
          on: {
            UP: [
              {
                actions: "dec",
                target: "recommendedArticles",
                cond: "reachedTop",
              },
              {
                actions: "dec",
              },
            ],
            DOWN: [
              {
                actions: "inc",
              },
            ],
            LEFT: {
              target: "articlesList",
            },
            ENTER: {
              actions: (ctx) => this.externalActions.enterRecentBlog(ctx),
            },
          },
        },
      },
    },
    {
      actions: actions,
      guards: {
        reachedTop: (ctx) => ctx.idx === 0,
        reachedBottom: (ctx) => ctx.idx === ctx.cnt - 1,
      },
    }
  );
}
export { HomeMachine };
