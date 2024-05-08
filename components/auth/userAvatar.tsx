import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { ExitIcon, AvatarIcon,PlusIcon, TableIcon} from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";

export const  UserButton = () => {
  const { data: session } = useSession();



  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <Link href="/settings">
        <DropdownMenuItem>
        <AvatarIcon className="h-4 w-4 mr-2 text-[#AB9D62]" />
          {session?.user?.name}
        </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {
          session?.user?.role === "Admin" ? (
            <><Link href="/admin/register"><DropdownMenuItem>
              <PlusIcon className="h-4 w-4 mr-2 text-[#AB9D62]" />
              Ajout

            </DropdownMenuItem>
            </Link><DropdownMenuSeparator /></>
            
          ) : null
        }
        {
          session?.user?.role === "Admin" ? (
            <><Link href="/admin/users"><DropdownMenuItem>
              <TableIcon className="h-4 w-4 mr-2 text-[#AB9D62]" />
              Utilisateurs

            </DropdownMenuItem>
            </Link><DropdownMenuSeparator /></>
            
          ) : null
        }
        <LogoutButton>
          <DropdownMenuItem>
          <ExitIcon className="h-4 w-4 mr-2 text-[#AB9D62]" />
            Deconnexion
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
