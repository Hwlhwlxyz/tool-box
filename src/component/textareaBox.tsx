import { InputGroup, Textarea, InputRightElement, Button, Box } from "@chakra-ui/react";
import { MutableRefObject, useRef } from "react";
import { writeText, readText } from '@tauri-apps/api/clipboard';

export default function TextareaBox(props: { value: string| undefined; }) {
    const textRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
    function onClickCopy() {
        textRef.current.select();
        if (props.value) {
            // @ts-ignore
            if (window.__TAURI__) {
                writeText(props.value);
              } 
        }
    }
    return (
        <Box>
                <InputGroup size="md">
                  <Textarea
                    pr="4.5rem"
                    value={props.value}
                    placeholder="base64"
                    ref={textRef}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={onClickCopy}>
                      {"copy"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                </Box>
    )
}