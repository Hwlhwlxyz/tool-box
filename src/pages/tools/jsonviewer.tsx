import dynamic from "next/dynamic";
import { ChangeEvent, useMemo, useState } from "react";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });
const DynamicEditor = dynamic(import("@/component/editor"), { ssr: false });
import {
  Button,
  ButtonGroup,
  FormLabel,
  HStack,
  Select,
} from "@chakra-ui/react";
import { Input, Box } from "@chakra-ui/react";
import { useThrottle } from "@react-hook/throttle";
import { CollapsedFieldProps } from "react-json-view";
import { beautifyJSON, strToJson, toOneLineJSON } from "@/util/jsonUtil";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

// json-viewer library
// https://github.com/TexteaInc/json-viewer/issues/9
// https://github.com/alenaksu/json-viewer

export default function JsonViewerTool() {
  const [jsonObject, setJsonObject] = useState({ testjson });
  const [inputText, setInputText] = useState("");
  const [keyword, setKeyword] = useThrottle("", 1);
  const [editorContent, setEditorContent] = useState<string>("");

  console.log("jsonviewer");
  function keywordChange(e: ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value);
    setInputText(e.target.value);
    setKeyword(e.target.value);
  }

  function handleEditorChange(value: string) {
    console.log("setvalue", value);
    setEditorContent(value);
    if (editorContent != null) {
      try {
        let j = JSON.parse(editorContent); //https://github.com/simonlovesyou/js-object-parser/blob/master/js-object-parser.js
        setJsonObject(j);
      } catch (e) {
        console.log("handleEditorChange: parse error", e);
      }
    }
  }

  const jsonViewerComponent = useMemo(() => {
    function shouldCollapseObject(obj: any, keyword: string): boolean {
      if (["string", "number", "boolean"].includes(typeof obj)) {
        if (String(obj).includes(keyword)) {
          console.log(obj, keyword, "match");
          return false;
        } else {
          return true;
        }
      } else if (obj == null) {
        return true;
      } else if (
        typeof obj === "object" &&
        !Array.isArray(obj) &&
        obj !== null
      ) {
        let tempShouldCollapse = true;
        for (const [key, value] of Object.entries(obj)) {
          if (key.includes(keyword)) {
            return false;
          } else {
            tempShouldCollapse =
              tempShouldCollapse && shouldCollapseObject(value, keyword);
          }
        }
        return tempShouldCollapse;
      } else if (Array.isArray(obj)) {
        let tempShouldCollapse = true;
        for (let i = 0; i < obj.length; i++) {
          tempShouldCollapse =
            tempShouldCollapse && shouldCollapseObject(obj[i], keyword);
          if (tempShouldCollapse == false) {
            return tempShouldCollapse;
          }
        }
        return tempShouldCollapse;
      }
      return true;
    }
    function shouldCollapseByKeyword(
      field: CollapsedFieldProps,
      keyword: string
    ) {
      if (keyword.length == 0) {
        return false;
      }
      return shouldCollapseObject(field.src, keyword);
    }

    const KeyRenderer: any = ({ path }: any) => {
      return <u>&quot;{path.slice(-1)}&quot;</u>;
    };
    KeyRenderer.when = (props: { value: number }) =>
      String(props.value).includes(keyword);

    return (
      <DynamicReactJson
        src={jsonObject}
        shouldCollapse={(field) => {
          return shouldCollapseByKeyword(field, keyword);
        }}
      />
    );
  }, [jsonObject, keyword]);

  return (
    <div className="outside-style">
      <Box display="flex">
        <Input
          onChange={keywordChange}
          value={inputText}
          variant="outline"
          placeholder="Search"
        />
      </Box>

      <Box display="flex">
        <Box>
          <Box>
            <Button
              colorScheme="blue"
              onClick={() => setEditorContent((prev) => toOneLineJSON(prev))}
            >
              one line
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setEditorContent((prev) => beautifyJSON(prev));
              }}
            >
              format
            </Button>
            <HStack display="flex">
              <FormLabel>Space:</FormLabel>
              <NumberInput
                defaultValue={2}
                min={0}
                placeholder="level"
                onChange={(valueString) => {
                  setEditorContent(() => {
                    if (valueString != "") {
                      return beautifyJSON(editorContent, valueString);
                    } else {
                      return editorContent;
                    }
                  });
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </Box>
          <DynamicEditor onChange={handleEditorChange} text={editorContent} />
        </Box>

        {jsonViewerComponent}
      </Box>

      <div></div>

      <div></div>
    </div>
  );
}

let testjson: any = [
  {
    _id: "642847ff97eaf1b8e70f534c",
    index: 0,
    guid: "5e3b36ec-d5bd-484a-a92d-5f5ca4e86b3b",
    isActive: false,
    balance: "$1,863.39",
    picture: "http://placehold.it/32x32",
    age: 28,
    eyeColor: "blue",
    name: "Suzanne Barnes",
    gender: "female",
    company: "COLAIRE",
    email: "suzannebarnes@colaire.com",
    phone: "+1 (897) 475-2076",
    address: "195 Atlantic Avenue, Caron, New Mexico, 5695",
    about:
      "Sint mollit excepteur laboris est enim non sunt. Duis exercitation dolore ea aliqua non occaecat aliqua minim officia aliquip labore ea laboris deserunt. Irure in eu sit sit et amet laborum dolor consequat irure elit amet quis duis.\r\n",
    registered: "2016-12-14T08:12:58 +05:00",
    latitude: 35.627899,
    longitude: -94.081309,
    tags: [
      "laborum",
      "voluptate",
      "minim",
      "deserunt",
      "ex",
      "elit",
      "incididunt",
    ],
    friends: [
      { id: 0, name: "Deleon Franco" },
      { id: 1, name: "Gates Franklin" },
      { id: 2, name: "Turner Mullen" },
    ],
    greeting: "Hello, Suzanne Barnes! You have 8 unread messages.",
    favoriteFruit: "banana",
  },
  {
    _id: "642847fff13f9e0d4dd23ca3",
    index: 1,
    guid: "e09774c2-5a68-4510-b0ee-312cd563aad1",
    isActive: false,
    balance: "$3,627.07",
    picture: "http://placehold.it/32x32",
    age: 37,
    eyeColor: "blue",
    name: "Glenn Tucker",
    gender: "male",
    company: "GEEKETRON",
    email: "glenntucker@geeketron.com",
    phone: "+1 (899) 575-2093",
    address: "852 Prospect Street, Harborton, Northern Mariana Islands, 8284",
    about:
      "Mollit sint tempor magna duis anim id Lorem non Lorem irure ullamco deserunt. Aliquip veniam officia esse ea. Aliquip et amet occaecat tempor sunt quis sunt officia quis sunt voluptate mollit in. Culpa irure ex amet sunt incididunt reprehenderit labore commodo nostrud elit proident. Proident tempor id ea mollit reprehenderit dolore qui qui Lorem voluptate do. Velit sit fugiat eu proident ipsum. Minim consequat nostrud nostrud consequat tempor nulla do et ea aliqua voluptate.\r\n",
    registered: "2018-08-29T03:00:32 +04:00",
    latitude: 5.54322,
    longitude: 89.087007,
    tags: [
      "ullamco",
      "exercitation",
      "aute",
      "laborum",
      "sit",
      "magna",
      "culpa",
    ],
    friends: [
      { id: 0, name: "Sullivan Michael" },
      { id: 1, name: "Darcy Leach" },
      { id: 2, name: "Powers Carrillo" },
    ],
    greeting: "Hello, Glenn Tucker! You have 9 unread messages.",
    favoriteFruit: "strawberry",
  },
  {
    _id: "642847ff4bfbffca28536053",
    index: 2,
    guid: "eea7b2e1-cbe5-41f1-83e8-875e857166d3",
    isActive: true,
    balance: "$1,499.88",
    picture: "http://placehold.it/32x32",
    age: 36,
    eyeColor: "green",
    name: "Jenna Morgan",
    gender: "female",
    company: "SLAMBDA",
    email: "jennamorgan@slambda.com",
    phone: "+1 (829) 407-3865",
    address: "590 Nevins Street, Boykin, Rhode Island, 5914",
    about:
      "Cupidatat id excepteur laborum esse velit cillum labore ea eiusmod minim proident officia. Qui minim id reprehenderit elit. Commodo sunt ea officia ad exercitation commodo. Ullamco aute voluptate ut veniam.\r\n",
    registered: "2018-12-29T07:44:13 +05:00",
    latitude: 8.882565,
    longitude: 84.647006,
    tags: [
      "nostrud",
      "consequat",
      "deserunt",
      "reprehenderit",
      "nulla",
      "ullamco",
      "commodo",
    ],
    friends: [
      { id: 0, name: "Kirk Duffy" },
      { id: 1, name: "Frances Cherry" },
      { id: 2, name: "Nanette Kidd" },
    ],
    greeting: "Hello, Jenna Morgan! You have 5 unread messages.",
    favoriteFruit: "banana",
  },
  {
    _id: "642847ffb266c8d4ed8e074e",
    index: 3,
    guid: "09236395-a578-47a4-94d8-f3543eb6fc10",
    isActive: false,
    balance: "$2,335.85",
    picture: "http://placehold.it/32x32",
    age: 30,
    eyeColor: "brown",
    name: "Kerri Newton",
    gender: "female",
    company: "XOGGLE",
    email: "kerrinewton@xoggle.com",
    phone: "+1 (956) 516-2146",
    address: "243 Degraw Street, Kenwood, Wisconsin, 7702",
    about:
      "Ipsum consequat consectetur incididunt pariatur sit. Ullamco cillum non non dolore minim pariatur. Ullamco quis amet magna laborum aute laborum. Ut deserunt fugiat nostrud enim quis in sit pariatur elit dolore. Officia velit pariatur laboris aliqua ut consectetur et.\r\n",
    registered: "2015-08-25T12:51:14 +04:00",
    latitude: -62.195472,
    longitude: -96.486447,
    tags: ["amet", "non", "proident", "reprehenderit", "fugiat", "qui", "sint"],
    friends: [
      { id: 0, name: "Ernestine Ochoa" },
      { id: 1, name: "Amy Vaughan" },
      { id: 2, name: "Adriana Cleveland" },
    ],
    greeting: "Hello, Kerri Newton! You have 10 unread messages.",
    favoriteFruit: "apple",
  },
  {
    _id: "642847ff0f2c6daa6a8549f3",
    index: 4,
    guid: "ead0596d-6b1e-4e3a-9d01-80a4156f03a8",
    isActive: true,
    balance: "$1,968.31",
    picture: "http://placehold.it/32x32",
    age: 37,
    eyeColor: "green",
    name: "Quinn Grimes",
    gender: "male",
    company: "INTRAWEAR",
    email: "quinngrimes@intrawear.com",
    phone: "+1 (862) 431-2558",
    address: "154 Irwin Street, Trucksville, Oregon, 8997",
    about:
      "Qui officia sint duis nostrud consectetur velit aliquip proident tempor fugiat cillum minim ex cillum. Eiusmod eiusmod mollit mollit do occaecat ad ea sunt nulla ad fugiat anim labore. Non commodo esse non consectetur dolore sint velit eiusmod fugiat aliquip sunt cupidatat nisi fugiat. Quis nisi magna eiusmod duis ullamco velit. Ut adipisicing dolore occaecat proident incididunt voluptate do amet magna exercitation. Ad fugiat magna Lorem id aute non aute irure ullamco. Sunt elit non velit eu reprehenderit laborum magna.\r\n",
    registered: "2017-01-22T01:56:21 +05:00",
    latitude: -16.305059,
    longitude: 166.825603,
    tags: ["deserunt", "id", "Lorem", "mollit", "sint", "nisi", "minim"],
    friends: [
      { id: 0, name: "Francesca Donaldson" },
      { id: 1, name: "Marietta Acosta" },
      { id: 2, name: "Leta Randall" },
    ],
    greeting: "Hello, Quinn Grimes! You have 10 unread messages.",
    favoriteFruit: "banana",
  },
];
testjson = [
  {
    _id: "642847ff97eaf1b8e70f534c",
    index: 0,
    str: "this is string",
    nested: { nested1: 1, nested2: 2, nested3: { nestednested: "unique" } },
  },
  {
    guid: "5e3b36ec-d5bd-484a-a92d-5f5ca4e86b3b",
    isActive: false,
    balance: "$1,863.39",
    a: { a1: "notdup" },
  },
];
