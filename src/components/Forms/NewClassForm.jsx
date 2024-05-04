import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { TwitterPicker } from 'react-color';
import { createClass } from '../../graphql/mutations';

const client = generateClient();

function NewClassForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    classSemesterId: null,
    code: '',
    title: '',
    desiredScore: 100.0,
    units: 3,
    displayColor: '#00CDB7',
  });
  const [queryKey, setQueryKey] = useState(null);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    setQueryKey([`${formData.classSemesterId}-classes`]);
  }, [formData.classSemesterId]);

  const submitNewClass = async () => {
    try {
      console.log(formData);
      await client.graphql({
        query: createClass,
        variables: {
          input: formData,
        },
        authMode: 'userPool',
      });
      console.log('CLASS ADDED!!!!');
    } catch (err) {
      console.error('Error adding class', err);
      throw new Error(err.message);
    }
  };

  const saveClass = useMutation({
    mutationFn: submitNewClass,
    onMutate: async (newClass) => {
      await queryClient.cancelQueries({ queryKey });
      const previousClasses = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => [...old, newClass]);
      return { previousClasses };
    },
    onError: (err, newClass, context) => {
      queryClient.setQueryData(queryKey, context.previousClasses);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <>
      <h3 className="font-bold text-lg">New Class</h3>
      <div className="w-3/4">
        <input id="new_class_modal_semester" hidden />
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Code</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g CMSC420, MATH140, HIST100"
            value={formData.code}
            onChange={(e) => {
              setFormData({
                ...formData,
                classSemesterId: document.getElementById('new_class_modal_semester').value,
                code: e.target.value,
              });
            }}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g Intro to Calculus, Data Structures + Algorithms"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Desired Score</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={formData.desiredScore}
            onChange={(e) => setFormData({ ...formData, desiredScore: e.target.value })}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Units</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={formData.units}
            onChange={(e) => setFormData({ ...formData, units: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Display Color</span>
          </div>
          <TwitterPicker
            color={formData.displayColor}
            onChangeComplete={(color) => setFormData({ ...formData, displayColor: color.hex })}
            width="100%"
            triangle="hide"
            colors={[
              '#0000FF', // Blue
              '#FF0000', // Red
              '#008000', // Green
              '#800080', // Purple
              '#FFFF00', // Yellow
              '#FFA500', // Orange
              '#FFC0CB', // Pink
              '#40E0D0', // Turquoise
              '#A52A2A', // Brown
              '#808080', // Gray
              '#FF1493', // Deep Pink
              '#00FFFF', // Cyan
              '#FF6347', // Tomato
              '#7FFF00', // Chartreuse
              '#800000', // Maroon
              '#4682B4', // Steel Blue
              '#FFD700', // Gold
              '#7FFFD4', // Aquamarine
              '#9932CC', // Dark Orchid
              '#FF4500', // Orange Red
              '#00FF00', // Lime Green
              '#8A2BE2', // Blue Violet
              '#008080', // Teal
              '#FF00FF', // Magenta
            ]}
          />
        </label>
      </div>
      <div className="mt-4 p-4">
        <form method="dialog">
          <button className="btn btn-primary btn-wide" onClick={() => saveClass.mutate(formData)}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewClassForm;
