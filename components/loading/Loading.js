import React, { useState } from 'react';
import { Button, Divider, Image, Transition } from 'semantic-ui-react';

const Loading = () => {
  const [visible, setVisible] = useState(true);

  const colors = ['red', 'amber', 'green', 'indigo', 'blue', 'gray'];
  const colorsGrades = ['500', '600', '700', '900'];
  setTimeout(() => {
    setVisible(!visible);
  }, 1000);

  return (
    <div className="flex justify-center py-96">
      <Divider hidden />
      {colorsGrades.map((grade) => (
        <Transition
          key={grade}
          visible={visible}
          animation="scale"
          duration={1000}
        >
          <div
            className={`spinner-grow  w-8 h-8 bg-current rounded-full opacity-0 text-indigo-${grade}`}
          ></div>
        </Transition>
      ))}
    </div>
  );
};
export default Loading;
