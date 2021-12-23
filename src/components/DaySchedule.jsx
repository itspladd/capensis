
import '../styles/DaySchedule.css';

import PageHeader from '../components/PageHeader'
import BlockList from './BlockList'
import ScheduleBar from './ScheduleBar'
import { useEffect, useState, useContext } from 'react';

// Popup modal hook and component
import usePopupBlockForm from '../hooks/usePopupBlockForm';
import BlockFormModal from './BlockFormModal';

// Helpers
import { 
  makeTimeString,
  makeWeekDayString,
  makeDateString } from '../helpers/stringHelpers'
import { blockIsOnDay } from '../helpers/timeHelpers';

// Constants
import SETTINGS from '../constants/settings'
import STRINGS from '../constants/strings'

import { ReducerState, ReducerActions } from '../reducer/context'

export default function DaySchedule(props) {
  const LANG = STRINGS[SETTINGS.LANGUAGES.EN_US].TAG;

  const state = useContext(ReducerState)
  const actions = useContext(ReducerActions)

  const [blocksWithPlaceholders, setBlocksWithPlaceholders] = useState([]);
  const [blockFormState, blockFormActions] = usePopupBlockForm(state.blocks, state.day, actions.data);

  const dayString = makeWeekDayString(LANG, state.day)
  const dateString = makeDateString(LANG, state.day)
  const earliestHour = 0;
  const latestHour = 23;
  const latestMinutes = 59;

  // Generate placeholder blocks for this day, for padding out the schedule
  useEffect(() => {
    const newBlocks = [];
    let currentTime = new Date(state.day);
    currentTime.setHours(earliestHour);
    const finalTime = new Date(state.day);
    finalTime.setHours(latestHour, latestMinutes);

    // Create all placeholder blocks that occur before the current Block
    state.blocks
      .filter(block => blockIsOnDay(block, state.day))
      .forEach(block => {
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
  }, [state.blocks, state.day])

  const headerActions = {
    "New Block": blockFormActions.new
  }

  return(
    <div className="daySchedule">
      {/* BlockFormModal is a popup modal, so it's always here,
      but only displayed if "show" is true */}
      <BlockFormModal
        state={blockFormState}
        actions={blockFormActions}
        currentDay={state.day}
        projects={state.projects}
      />
      <PageHeader
        nav
        back={() => actions.date.changeDay(-1)}
        forward={() => actions.date.changeDay(1)}
        title={dayString}
        subtitle={dateString}
        actions={headerActions}
      />
      <div className="dayScheduleInternal mt-1">
        <ScheduleBar />
        <BlockList
          blocks={blocksWithPlaceholders}
          day={state.day}
          toggleSession={actions.data.toggleSession}
          dataActions={actions.data}
          editBlock={blockFormActions.edit}
        />
      </div>
    </div>
  )
}