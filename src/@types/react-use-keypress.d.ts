// types/react-use-keypress.d.ts
declare module 'react-use-keypress' {
  import { Key } from 'react-use/lib/useKeyPress';
  type KeyPressHandler = (event: KeyboardEvent) => void;

  export default function useKeypress(
    key: Key | Key[],
    handler: KeyPressHandler
  ): void;
}