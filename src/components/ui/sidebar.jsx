
import { cn } from "@/lib/utils";
import { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "react-router";
import { SparklesText } from "./sparkles-text";
import { UserButton } from "@clerk/clerk-react";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    (<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>)
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    (<SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>)
  );
};

export const SidebarBody = (props) => {
  return (<>
    <DesktopSidebar {...props} />
    <MobileSidebar {...(props)} />
  </>);
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (<>
    <motion.div
      className={cn(
        "h-screen overflow-hidden overflow-y-auto sticky top-0 px-4 py-4 hidden md:flex md:flex-col bg-neutral-100/50 dark:bg-neutral-800/80 w-[300px] flex-shrink-0 backdrop-blur-xl border-r border-neutral-200 dark:border-neutral-700",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}>
      {children}
      <UserButton
        showName={open}
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
            userButtonTrigger: "hover:opacity-80 transition-opacity",
            userButtonBox: { flexDirection: "row-reverse" }
          }
        }}
        
      />
    </motion.div>

  </>);
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  return (<>
    <div
      className={cn(
        "h-16 px-4 flex flex-row md:hidden items-center bg-white dark:bg-neutral-900 w-full border-b border-neutral-200 dark:border-neutral-800 fixed top-0 left-0 z-40 shadow-sm"
      )}
      {...props}>
      <div className="flex justify-between items-center z-20 w-full ">
        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200 w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => setOpen(!open)} />
        <SparklesText sparklesCount={5} text={"Raasathi"} className={'text-2xl '} />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonTrigger: "hover:opacity-80 transition-opacity",
            }
          }}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-[100dvh] w-full inset-0 bg-white dark:bg-neutral-900 px-6 py-8 z-[100] flex flex-col",
              className
            )}>
            <div
              className="absolute right-4 top-4 z-50 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              onClick={() => setOpen(!open)}>
              <IconX className="w-6 h-6 text-neutral-800 dark:text-neutral-200" />
            </div>
            <div className="overflow-y-auto flex-1 mt-8">
              {children}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>);
};

export const SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  return (
    (<Link
      to={link.href}
      className={cn("flex items-center justify-start gap-2  group/sidebar py-2", className)}
      onClick={() => setOpen(false)}
      {...props}>
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",

        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
        {link.label}
      </motion.span>
    </Link>)
  );
};
