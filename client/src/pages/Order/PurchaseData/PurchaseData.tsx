import { Box, Divider, Stack } from '@mui/material';
import PurchaseStore from '../../../mobx/PurchaseStore';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import SinglePurchaseData from './SinglePurchaseData/SinglePurchaseData';
import { observer } from 'mobx-react';
import { themeStyles } from '../../../utils/themeStyles';

const PurchaseData = observer(() => {
  const { products } = PurchaseStore;
  const navigate = useNavigate();
  const total = products.reduce((acc, curr) => {
    return acc + curr!.newPrice;
  }, 0);

  useEffect(() => {
    if(products.length === 0) { 
      navigate(-1);
    }
  }, []);
  
  return (
    <Box>
      {products.map(product => <Stack key={product?.id}>
        <SinglePurchaseData product={product}/>
        <Divider/>
      </Stack>)}
      <div style={{marginTop: 25}}>Sum: <span style={{color: themeStyles.error}}>{total}$</span></div>
    </Box>
  )
});

export default PurchaseData