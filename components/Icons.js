import { Icon } from '@iconify/react';
('@iconify/react');

import React from 'react';

 function Icons({ icon }) {
	
	return <Icon icon={icon} color='blue' width='82' height='82' rotate={0} />;
}
export default React.memo(Icons);