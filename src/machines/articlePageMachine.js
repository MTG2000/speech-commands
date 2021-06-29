import BaseMachine from "./baseMachine";
import { createMachine, assign } from "xstate";
import throttle from "lodash.throttle";

const actions = {
  inc: assign({ idx: (ctx) => (ctx.idx + 1) % ctx.cnt }),
  dec: assign({ idx: (ctx) => Math.max(0, ctx.idx - 1) }),
  scrollDown: () => scroll(),
  scrollUp: () => scroll(true),
};
const scroll = throttle(function (toTop = false) {
  window.scroll({
    top: window.scrollY + ((toTop ? -1 : 1) * window.innerHeight) / 2,
    behavior: "smooth",
  });
}, 500);

class ArticlePageMachine extends BaseMachine {
  cnts = {
    recents: 3,
  };
  externalActions = {
    enterRecentBlog: () => {},
    reachedBottomOfBlog: () => {},
    reachedTopOfComments: () => {},
    playVideo: () => {},
    stopVideo: () => {},
  };
  machine = createMachine(
    {
      id: "article-page-machine",
      initial: "initial",
      context: {
        idx: 0,
        cnt: 0,
      },
      states: {
        initial: {
          on: {
            READY: "mainArticle",
          },
        },

        mainArticle: {
          on: {
            DOWN: [
              {
                target: "recommendedArticles",
                cond: "reachedBottomOfBlog",
              },
              {
                actions: "scrollDown",
              },
            ],
            UP: {
              actions: "scrollUp",
            },
            ON: {
              actions: (ctx) => this.externalActions.playVideo(ctx),
            },
            OFF: {
              actions: (ctx) => this.externalActions.stopVideo(ctx),
            },
            RIGHT: {
              target: "recentArticles",
            },
          },
        },
        comments: {
          on: {
            UP: [
              {
                target: "recommendedArticles",
                cond: "reachedTopOfComments",
              },
              {
                actions: "scrollUp",
              },
            ],
            DOWN: {
              actions: "scrollDown",
            },
          },
        },
        recommendedArticles: {
          entry: assign(() => ({
            cnt: this.getCnts("recommendeds"),
            idx: 0,
          })),
          on: {
            LEFT: { actions: "dec" },
            RIGHT: { actions: "inc" },
            UP: {
              target: "mainArticle",
            },
            DOWN: {
              target: "comments",
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
              },
            ],
            DOWN: [
              {
                actions: "inc",
              },
            ],
            LEFT: {
              target: "mainArticle",
            },
            ENTER: {
              actions: (ctx) => this.externalActions.enterRecentBlog(ctx),
            },
          },
        },
      },
      on: {
        RESET: {
          target: "initial",
        },
      },
    },
    {
      actions: actions,
      guards: {
        reachedTop: (ctx) => ctx.idx === 0,
        reachedBottom: (ctx) => ctx.idx === ctx.cnt - 1,
        reachedBottomOfBlog: (ctx) =>
          this.externalActions.reachedBottomOfBlog(),
        reachedTopOfComments: (ctx) =>
          this.externalActions.reachedTopOfComments(),
      },
    }
  );
}
export { ArticlePageMachine };
