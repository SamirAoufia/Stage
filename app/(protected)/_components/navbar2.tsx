"use client"
import { UserButton } from "@/components/auth/userAvatar";
import Image from "next/image";
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon} from "@radix-ui/react-icons"

export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<nav className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-sm">
      <div className="hidden md:flex items-start">
        <Image src="/LSGlogo.svg" alt="logo" width={150} height={150} />
      </div>

      {/* Bouton de menu pour la version mobile */}
      <div className="md:hidden">
      <button onClick={toggleMenu}>
          {menuOpen ? <Cross1Icon  /> : <HamburgerMenuIcon />}
        </button>
      </div>

      <div className={`md:flex md:items-center ${menuOpen ? '' : 'hidden'}`}>

      <NavigationMenu>
      <NavigationMenuList   className="grid grid-cols-3 md:grid-cols-none md:flex">
      <NavigationMenuItem   className="" >
          <Link href="/information" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} >
              Information
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem >
          <Link href="/documentation" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cuisson</NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              
              <ListItem href="/cuisson" title="Direct">
              Graphique de la cuisson en direct.
              </ListItem>
              <ListItem href="/cuisson/choix" title="Choix">
              Choix de la date et  du repas.
              </ListItem>
              <ListItem href="/cuisson/ajout" title="Ajout">
              Ajouter le repas avec la date.
              </ListItem>
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Plateau</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              
              <ListItem href="/plateau" title="Direct">
                Graphique des plateaux en direct.
              </ListItem>
              <ListItem href="/plateau/ajout" title="Ajout personne">
                Ajouter les personnes, la date & les repas.
              </ListItem>
              <ListItem href="/plateau/choix" title="Choix">
                Choix de la date et/ou de la personne.
              </ListItem>
              <ListItem href="/plateau/plateau" title="Ajout plateau">
                Code a ajouter pour un nouveau plateau.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Bluetooth</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              
              <ListItem href="/bluetooth" title="Direct">
                Graphique en direct de la connexion bluetooth.
              </ListItem>
              <ListItem href="/bluetooth/choix" title="Choix">
                Choix de la date.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
      </NavigationMenuList>
    </NavigationMenu>
    </div>
      <div className="items-end">
        <UserButton />
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
