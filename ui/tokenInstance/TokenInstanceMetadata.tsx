import { Box, Flex, Select, chakra } from '@chakra-ui/react';
import React from 'react';

import type { TokenInstance } from 'types/api/token';

import CopyToClipboard from 'ui/shared/CopyToClipboard';
import RawDataSnippet from 'ui/shared/RawDataSnippet';

import TokenInstanceMetadataAccordion from './metadata/TokenInstanceMetadataAccordion';

type Format = 'JSON' | 'Table'

interface Props {
  data: TokenInstance['metadata'] | undefined;
}

const TokenInstanceMetadata = ({ data }: Props) => {
  const [ format, setFormat ] = React.useState<Format>('Table');

  const handleSelectChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(event.target.value as Format);
  }, []);

  if (!data) {
    return <Box>There is no metadata for this NFT</Box>;
  }

  const content = format === 'Table' ?
    <TokenInstanceMetadataAccordion data={ data }/> :
    <RawDataSnippet data={ JSON.stringify(data, undefined, 4) } showCopy={ false }/>;

  return (
    <Box>
      <Flex alignItems="center" mb={ 6 }>
        <chakra.span fontWeight={ 500 }>Metadata</chakra.span>
        <Select size="xs" borderRadius="base" value={ format } onChange={ handleSelectChange } focusBorderColor="none" w="auto" ml={ 5 }>
          <option value="Table">Table</option>
          <option value="JSON">JSON</option>
        </Select>
        { format === 'JSON' && <CopyToClipboard text={ JSON.stringify(data) } ml="auto"/> }
      </Flex>
      { content }
    </Box>
  );
};

export default React.memo(TokenInstanceMetadata);
