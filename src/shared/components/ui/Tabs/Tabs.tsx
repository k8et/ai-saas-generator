"use client";

import React, { createContext, forwardRef, useContext } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, MotionConfig } from "framer-motion";
import {cn} from "@shared/lib/utils";
import { Transition } from "framer-motion";

const transition: Transition = {
    type: "spring",
    stiffness: 170,
    damping: 24,
    mass: 1.2,
};
type TabsContextType = {
  value: string;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

type TabsProviderProps = {
  children: React.ReactNode;
  value: string;
};

function TabsProvider({ children, value }: TabsProviderProps) {
  return (
      <TabsContext.Provider value={{ value }}>{children}</TabsContext.Provider>
  );
}

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
      <MotionConfig transition={transition}>
        <TabsProvider value={value}>
          <TabsPrimitive.Root
              value={value}
              onValueChange={onValueChange}
              className="relative"
          >
            {children}
          </TabsPrimitive.Root>
        </TabsProvider>
      </MotionConfig>
  );
}

const TabsList = forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "flex w-full items-center justify-start overflow-hidden rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",
            className,
        )}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
    const { value } = useTabs();
    const isActive = value === props.value;

    return (
        <div className="relative flex-1">
            {isActive && (
                <motion.div
                    layoutId="active-tab-bg"
                    style={{ borderRadius: 8 }}
                    className="absolute inset-0 rounded-lg bg-primary shadow-[rgba(0,0,0,0.04)_0px_1px_6px]  dark:shadow-[rgba(0,0,0,0.2)_0px_1px_6px]"
                />
            )}
            <TabsPrimitive.Trigger
                ref={ref}
                className={cn(
                    "relative z-10 flex w-full min-w-0 items-center justify-center whitespace-nowrap rounded-lg bg-transparent px-3 py-1.5 text-sm font-medium text-white mix-blend-exclusion transition-none transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-black hover:data-[state=inactive]:opacity-70",
                    className,
                )}
                {...props}
            >
                {children}
            </TabsPrimitive.Trigger>
        </div>
    );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            className,
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
