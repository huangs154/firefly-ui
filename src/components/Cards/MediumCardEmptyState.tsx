// Copyright © 2022 Kaleido, Inc.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { DEFAULT_BORDER_RADIUS, DEFAULT_PADDING } from '../../theme';

interface Props {
  header?: string;
  message?: string;
}

export const MediumCardEmptyState: React.FC<Props> = ({ header, message }) => {
  return (
    <>
      <Box
        mt={1}
        p={2}
        borderRadius={DEFAULT_BORDER_RADIUS}
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'background.paper',
        }}
      >
        <Grid
          p={DEFAULT_PADDING}
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              {header}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
