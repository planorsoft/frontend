import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeEachWord(str: string){
  const str_arr = str.split(' ')

  for(let i = 0; i < str_arr.length; i++){
      str_arr[i] = str_arr[i][0].toUpperCase() + str_arr[i].slice(1)
  }
  return str_arr.join(' ')
}
