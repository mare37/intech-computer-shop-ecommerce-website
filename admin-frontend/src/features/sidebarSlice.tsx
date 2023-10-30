import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface sideBarState {
    value: boolean
  }


  const initialState: sideBarState = {
    value: false
  }



  export const sideBarSlice = createSlice({
    name: 'sidebar',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setSiderBar: state => {
    
          return {value:!state.value } 
      },
      setSiderBarToFalse: state => {
    
        return {value:false } 
    },
    }
  })

  export const { setSiderBar,setSiderBarToFalse } = sideBarSlice.actions



  export default sideBarSlice.reducer