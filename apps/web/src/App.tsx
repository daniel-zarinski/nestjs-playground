import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { useStores } from './stores';

export const App = observer(() => {
  const { counter } = useStores();

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Button
              onClick={() => {
                counter.increment();
              }}
            >
              Increment
            </Button>
            <Text color="teal.500" fontSize="2xl" target="_blank">
              {counter.count}
            </Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
});
