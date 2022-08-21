/** @jsx h */

import { h } from 'preact';
import { tw } from '@twind';

interface NavbarProps {
  active: string;
}

export default function Navbar({ active }: NavbarProps) {
  const items = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Docs',
      href: '/docs',
    },
    { name: 'Github', href: 'https://github.com/pbkit/wrp.pbkit.dev' },
  ];

  return (
    <nav class={tw`py-2`}>
      <div
        class={tw`flex items-center justify-between max-w-screen-lg mx-auto`}
      >
        <a class={tw`flex items-center gap-2 mx-4 tracking-tight`} href="/">
          <p class={tw`text-2xl`}>🌯</p>
          <span
            class={tw`text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-red-600 animate-gradient-x bg-repeat font-extrabold text-2xl`}
          >
            WRP
          </span>
        </a>
        <ul class={tw`flex justify-end gap-8 mx-4`}>
          {items.map(item => (
            <li>
              <a
                href={item.href}
                class={tw`text-gray-100 hover:underline ${
                  active == item.href ? 'font-bold' : ''
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
