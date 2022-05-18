import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';

export const LoadForm = () => {
  const dispatch = useAppDispatch();

  const [selectedMap, setSelectedMap] = useState({ name: '', mapData: '' });
  const [fetchedMaps, setFetchedMaps] = useState<any[]>([]);

  useEffect(() => {
    // fetch maps
    const maps = [
      { name: 'map1', mapData: { '2,2': '1', '2,3': '1', '3,4': '1' } },
      { name: 'map2', mapData: { '2,2': '3', '2,3': '3', '3,4': '3' } },
    ];
    setFetchedMaps(maps);
  }, []);

  const showMaps = () => {
    return fetchedMaps.map((map, index) => (
      <option key={map.name} value={index}>
        {map.name}
      </option>
    ));
  };

  const loadMap = () => {
    alert(selectedMap.name);
  };

  return (
    <div>
      <h2>Load Map</h2>
      <label htmlFor="chooseMap">Choose Map</label>
      <select
        id="chooseMap"
        onChange={(e) => setSelectedMap(fetchedMaps[+e.target.value])}
      >
        {showMaps()}
      </select>
      <button onClick={loadMap}>Load Map</button>
    </div>
  );
};
