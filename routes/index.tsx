/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import { tw } from '@twind';
import { Head } from '$fresh/runtime.ts';
import Footer from '../components/Footer.tsx';

export default function Home() {
  return (
    <>
      <Head>
        <title>WRP 🌯 - Webview/worker request protocol</title>
        <meta name="description" content="Webview/worker request protocol" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="true"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.4/dist/web/static/pretendard.css"
        />
      </Head>
      <div class={tw`min-h-screen flex flex-col justify-between`}>
        <div class={tw`flex flex-col gap-4`}>
          <section
            class={tw`p-4 max-w-screen-lg tracking-tight bg-[#00000044]`}
          >
            ⚠️ Working in progress. For WRP docs, see{' '}
            <a href="https://pbkit.dev" class={tw`text-amber-500`}>
              pbkit docs
            </a>{' '}
            instead.
          </section>
          <section class={tw`flex flex-col p-4 max-w-screen-lg tracking-tight`}>
            <div class={tw`flex flex-col`}>
              <div class={tw`flex justify-between`}>
                <h1
                  class={tw`text(4xl sm:6xl lg:8xl gray-200) font-extrabold mb-2`}
                >
                  <span
                    class={tw`text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-red-600 animate-gradient-x bg-repeat`}
                  >
                    WRP
                  </span>{' '}
                  🌯
                </h1>
                <div>
                  <a
                    href="https://github.com/pbkit/wrp-ts"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      class={tw`h(8 sm:12 lg:16)`}
                      viewBox="2 2 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <p
                class={tw`text(2xl sm:3xl lg:4xl gray-200) font-bold tracking-tighter`}
              >
                Webview<span class={tw`text-gray-300`}>/Worker</span> Request
                Protocol
              </p>
            </div>
            <p class={tw`text(xl sm:2xl lg:3xl gray-400) font-bolder`}>
              Develop Webview faster powered by Protocol Buffers
            </p>
          </section>
          <section
            class={tw`flex flex-col items-end p-4 max-w-screen-lg tracking-tight text-right`}
          >
            <p class={tw`text(xl sm:2xl lg:3xl gray-200) font-bold`}>
              Supports{' '}
              <span class={tw`text-orange-300`}>Web, iOS, Android</span> out of
              the box
            </p>
            <p class={tw`text(xl sm:2xl lg:3xl gray-200) font-bold`}>
              <span class={tw`text-orange-300`}>Schema first development</span>{' '}
              using Protocol Buffers
            </p>
            <p class={tw`text(xl sm:2xl lg:3xl gray-200) font-bold`}>
              Provides <span class={tw`text-orange-300`}>Remote DevTools</span>{' '}
              for local app development
            </p>
          </section>
          <section class={tw`flex justify-center`}>
            <button
              class={tw`px-8 py-4 rounded-full bg-gradient-to-br from-amber-200 to-red-500 text(l sm:xl lg:2xl black) font-bold`}
            >
              Watch example →
            </button>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
