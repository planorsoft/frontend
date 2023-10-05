import { Skeleton, Stack } from "@chakra-ui/react";

function Loading() {
  return (
    <Stack>
      <Skeleton height="30px" />
      <Skeleton height="30px" />
      <Skeleton height="30px" />
    </Stack>
  );
}

export default Loading;
