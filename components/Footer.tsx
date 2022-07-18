/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from 'preact';
import { tw } from '@twind';

export default function Footer() {
  return (
    <footer class={tw`flex items-center justify-center h-12 bg-[#00000022]`}>
      <p class={tw`text-gray-400`}>
        &copy; {new Date().getFullYear()} pbkit authors
      </p>
    </footer>
  );
}
