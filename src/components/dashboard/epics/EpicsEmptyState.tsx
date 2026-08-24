import { useNavigate } from 'react-router-dom';

import { EmptyEpics } from '../../../components/icons/EmptyEpics';
import { Light } from '../../../components/icons/Light';
import { Stars } from '../../../components/icons/Stars';
import { Tree } from '../../../components/icons/Tree';
import { Tree2 } from '../../../components/icons/Tree2';

const features = [
  {
    icon: Stars,
    title: 'High-Level Goals',
    description:
      'Define the broad objectives that span across multiple cycles.',
  },
  {
    icon: Tree,
    title: 'Hierarchy Design',
    description:
      'Link individual tasks to parent epics for a consolidated view.',
  },
  {
    icon: Tree2,
    title: 'Track Velocity',
    description: 'Visualize percentage completion at a macro project level.',
  },
];

export default function EpicsEmptyState() {
  const navigate = useNavigate();

  const handleCreateFirstEpic = () => {
    navigate('new');
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <EmptyEpics size={300} className="h-56 w-56" />

      <h2 className="headline-lg! text-neutral-high">
        No epics in this project yet.
      </h2>
      <p className=" mt-2 max-w-sm   text-[16px] text-[#434654]">
        Break down your large project into manageable epics to track progress
        better and maintain architectural clarity.
      </p>

      <button
        type="button"
        onClick={handleCreateFirstEpic}
        className="btn-primary rounded-sm mt-6 flex w-auto items-center justify-center gap-2 px-8"
      >
        <Light size={16} color="#fff" className="h-4 w-4" />
        Create First Epic
      </button>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {features.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex flex-col items-start rounded-lg bg-surface-low p-4 text-left max-w-55 h-40"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-white text-primary">
                <FeatureIcon size={22} color="#003D9B" className="h-5 w-5" />
              </div>
              <h3 className="body-md font-semibold text-neutral-high">
                {feature.title}
              </h3>
              <p className="label-sm mt-1 max-w-40 text-neutral-medium">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
