import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

// Common types
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

// Button types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  asChild?: boolean;
}

// Card types
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
