import '../styles/DaySchedule.css';

import Button from 'react-bootstrap/Button';
import BlockList from './BlockList'
import ScheduleBar from './ScheduleBar'
import { useEffect, useState } from 'react';

// Helpers
import { 
  makeTimeString,
  makeWeekDayString,
  makeDateString } from '../helpers/stringHelpers'

// Constants
import SETTINGS from '../constants/settings'
import STRINGS from '../constants/strings'

export default function DaySchedule(props) {
  const LANG = STRINGS[SETTINGS.LANGUAGES.EN_US].TAG;

  // Props:
  // blocks is an array of Block components.
  const { blocks, day, goToTomorrow, goToYesterday, showForm, toggleSession, refreshData } = props;

  const [blocksWithPlaceholders, setBlocksWithPlaceholders] = useState([]);

  const dayString = makeWeekDayString(LANG, day)
  const dateString = makeDateString(LANG, day)
  const earliestHour = 0;
  const latestHour = 23;
  const latestMinutes = 59;

  // Generate placeholder blocks for this day, for padding out the schedule
  useEffect(() => {
    const newBlocks = [];
    let currentTime = new Date(day);
    currentTime.setHours(earliestHour);
    const finalTime = new Date(day);
    finalTime.setHours(latestHour, latestMinutes);

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
    while(currentTime < finalTime) {
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
      <div className="dayScheduleHeader p-1">
        <div className="dayScheduleHeader_internal">
          <Button
            variant="info"
            onClick={goToYesterday}>
            {`<`}
          </Button>
          <Button
            variant="info"
            onClick={goToTomorrow}>
            {`>`}
          </Button>
          <div className="dayScheduleHeader_date">
            <h3>{dayString}</h3>
            <small className="text-muted">{dateString}</small>
          </div>
        </div>
        <Button variant="primary" onClick={showForm}>
            New Block
          </Button>
      </div>
      <div className="dayScheduleInternal mt-1">
        <ScheduleBar />
        <BlockList
          blocks={blocksWithPlaceholders}
          day={day}
          toggleSession={toggleSession}
          refreshData={refreshData}
        />
      </div>
    </div>
  )
}