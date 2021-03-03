import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, View } from 'react-native';

export interface Props {
  className?: string;
  onClick?: () => void;
  title: string;
}

/**
 * The react card component.
 */
const BaseCard: FunctionComponent<Props> = ({ children, className, onClick, title}) => {

  const newTitle = title+'Salut';

  const [value, setValue] = useState<string>(title);

  //value = 'Salut' // FAUX
  if(!value){
    setValue('Salut'); // BON
  }

  useEffect(() => {
    console.log('TITRE MODIFIE');
  }, [title]);

  return (
    <View onClick={onClick}>
      <Text>{newTitle}</Text>
      {children}
    </View>);
}

export default BaseCard;

/*<BaseCard>
  <Text> Salut</Text> // -> Children
</BaseCard>*/
//<BaseCard onClick={() => lancerFonction()} />