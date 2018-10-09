import React from 'react';
import LogoPSE from '../../assets/images/logo.png'
import { Grid, Image } from 'semantic-ui-react';

export const Logo = () =>{
  return (
    <Grid.Row centered>
      <Grid.Column>
        <Image src={LogoPSE} width={500} centered />
      </Grid.Column>
    </Grid.Row>
  )
}
