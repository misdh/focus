'use client'

import { Button } from '@/components/button'
import { update } from '@/lib/features/currentPage/currentPageSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useEffect, useState } from 'react'

// 60 * 50
const initialCount = 5

export default function ZonePage() {
  const [count, setCount] = useState(initialCount)
  const [run, setRun] = useState(false)
  const dispatch = useAppDispatch()

  const handleStart = () => {
    setRun(true)
  }

  const handleStop = () => {
    setRun(false)
  }

  const handleReset = () => {
    setCount(initialCount)
  }

  useEffect(() => {
    if (run && count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearInterval(intervalId)
    }

    if (count == 0) {
      dispatch(update('break'))
    }
  }, [count, run])

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="absolute top-0 mt-10 text-sm text-gray-500">focus</div>
        <div className="text-4xl font-semibold">
          {Math.floor(count / 60)}:{(count % 60).toString().padStart(2, '0')}
        </div>
        {!run && (
          <div className="absolute bottom-0 mb-10 flex text-sm text-gray-500">
            <div>
              <Button onClick={handleStart}>start</Button>
            </div>
            <div>
              <Button onClick={handleReset}>reset</Button>
            </div>
          </div>
        )}
        {run && (
          <div className="absolute bottom-0 mb-10 text-sm text-gray-500">
            <Button onClick={handleStop}>stop</Button>
          </div>
        )}
      </div>
    </>
  )
}