import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import * as encrypt from "@/util/encrypt";
import TextareaBox from "@/component/textareaBox";


interface resultValue {
  encode: string;
  decode: string;
}

export default function Encode() {
  const [value, setValue] = useState("");
  const [base64Value, setBase64Value] = useState<resultValue>({encode:'', decode:''});

  function handleValueChange(e: { target: { value: SetStateAction<string> } }) {
    setValue(e.target.value);
    let targetValueString:string = String(e.target.value);
    setBase64Value({encode:encrypt.base64encode(targetValueString), decode:encrypt.base64decode(targetValueString)});
  }

  function handleClick() {}
  return (
    <div className="outside-style">

      <Textarea
        onChange={handleValueChange}
        value={value}
        variant="outline"
        placeholder="Input"
        resize={undefined}
      />

      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        <Box>
          <Box>
          <SimpleGrid columns={2}>

            <p>encode</p>
            <p>decode</p>
          </SimpleGrid>
            <Card>
            <Heading size='xs'>base64</Heading>
              <SimpleGrid columns={2}>
              <TextareaBox value={base64Value['encode']}/>
                
              <TextareaBox value={base64Value['decode']}/>
                
              </SimpleGrid>
            </Card>

            
          </Box>
          


        </Box>
      </Grid>
    </div>
  );
}
function base64encode(): string {
  throw new Error("Function not implemented.");
}

