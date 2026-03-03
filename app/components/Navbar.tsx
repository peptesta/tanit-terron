'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Se lo scroll è maggiore di 20px, attiva lo stato
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/',       label: 'Home'      },
    { href: '/about',  label: 'Chi sono'  },
    { href: '/method', label: 'Il Metodo' },
  ];

  return (
    // Aggiungiamo la classe 'scrolled' dinamicamente
    <nav className={`tanit-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="tanit-logo" onClick={() => router.push('/')}>
        Tanit Terron
      </div>
      <ul className="tanit-nav-links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <button
              className={pathname === href ? 'active' : ''}
              onClick={() => router.push(href)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}