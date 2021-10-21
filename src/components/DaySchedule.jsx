import '../styles/DaySchedule.css';

import Button from 'react-bootstrap/Button';
import BlockList from './BlockList'
import ScheduleBar from './ScheduleBar'
import { useEffect, useState } from 'react';

// Helpers
import { makeTimeString } from '../helpers/stringHelpers'

export default function DaySchedule(props) {

  // Props:
  // blocks is an array of Block components.
  const { blocks, day, goToTomorrow, goToYesterday, showForm } = props;

  const [blocksWithPlaceholders, setBlocksWithPlaceholders] = useState([]);

  const dayString = day && day.toDateString();
  const earliestHour = 6;
  const latestHour = 20;

  // Generate placeholder blocks for this day, for padding out the schedule
  useEffect(() => {
    const newBlocks = [];
    let currentTime = new Date(day);
    currentTime.setHours(earliestHour)

    // Create all placeholder blocks that occur before the current Block
    blocks.forEach(block => {
      const blockDate = new Date(block.start_time);

      while(currentTime < blockDate) {
        // Make the placeholder block data
        const placeholderBlock = {
          id: `p${currentTime.getHours()}${currentTime.getMinutes() || "00"}`,
          title: makeTimeString(currentTime),
          project_id: -1,
          start_time: currentTime.toISOString()
        }
        // Advance the time by 15 minutes
        currentTime.setMinutes(currentTime.getMinutes() + 15);
        // Add the ending time to the placeholder block
        placeholderBlock.end_time = currentTime.toISOString();
        // Add placeholder to newBlocks
        newBlocks.push(placeholderBlock);
      }

      // Put the current Block in newBlocks in its spot
      newBlocks.push(block)
      // Update the currentTime to be the end of the current block
      currentTime = new Date(block.end_time)
    })

    // Finally, fill in any placeholders that go after the final block of the day
    while(currentTime.getHours() < latestHour) {
      // Make the placeholder block data
      const placeholderBlock = {
        id: `p${currentTime.getHours()}${currentTime.getMinutes() || "00"}`,
        title: makeTimeString(currentTime),
        project_id: -1,
        start_time: currentTime.toISOString()
      }
      // Advance the time by 15 minutes
      currentTime.setMinutes(currentTime.getMinutes() + 15);
      // Add the ending time to the placeholder block
      placeholderBlock.end_time = currentTime.toISOString();
      // Add placeholder to newBlocks
      newBlocks.push(placeholderBlock);
    }

    setBlocksWithPlaceholders(newBlocks)
  }, [blocks, day])

  return(
    <div className="daySchedule">
      <h3>{dayString}</h3>
      <Button variant="primary" onClick={showForm}>
        Make a new block
      </Button>
        <div className="dayScheduleInternal mt-2">
          <button
            className="btn btn-primary"
            onClick={goToYesterday}>{`<--`}</button>
          <ScheduleBar />
          <BlockList
            blocks={blocksWithPlaceholders}
            day={day}
          />
          <button
            className="btn btn-primary"
            onClick={goToTomorrow}>
              {`-->`}
          </button>
      </div>
    </div>
  )
}