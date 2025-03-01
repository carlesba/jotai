import { StrictMode } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { atom } from 'jotai'
import { atomWithImmer, useImmerAtom, withImmer } from 'jotai/immer'
import { getTestProvider } from '../testUtils'

const Provider = getTestProvider()

it('useImmerAtom with regular atom', async () => {
  const countAtom = atom(0)

  const Parent = () => {
    const [count, setCount] = useImmerAtom(countAtom)
    return (
      <>
        <div>count: {count}</div>
        <button onClick={() => setCount((draft) => (draft = draft + 1))}>
          Increase
        </button>
        <button onClick={() => setCount((draft) => (draft = draft - 1))}>
          Decrease
        </button>
      </>
    )
  }

  const { findByText, getByText } = render(
    <StrictMode>
      <Provider>
        <Parent />
      </Provider>
    </StrictMode>
  )

  await findByText('count: 0')

  fireEvent.click(getByText('Increase'))
  await findByText('count: 1')

  fireEvent.click(getByText('Decrease'))
  await findByText('count: 0')
})

it('useImmerAtom with immer atom', async () => {
  const countAtom = atomWithImmer(0)

  const Parent = () => {
    const [count, setCount] = useImmerAtom(countAtom)
    return (
      <>
        <div>count: {count}</div>
        <button onClick={() => setCount((draft) => (draft = draft + 1))}>
          Increase
        </button>
        <button onClick={() => setCount((draft) => (draft = draft - 1))}>
          Decrease
        </button>
      </>
    )
  }

  const { findByText, getByText } = render(
    <StrictMode>
      <Provider>
        <Parent />
      </Provider>
    </StrictMode>
  )

  await findByText('count: 0')

  fireEvent.click(getByText('Increase'))
  await findByText('count: 1')

  fireEvent.click(getByText('Decrease'))
  await findByText('count: 0')
})

it('useImmerAtom with derived immer atom', async () => {
  const regularCountAtom = atom(0)
  const countAtom = withImmer(regularCountAtom)

  const Parent = () => {
    const [count, setCount] = useImmerAtom(countAtom)
    return (
      <>
        <div>count: {count}</div>
        <button onClick={() => setCount((draft) => (draft = draft + 1))}>
          Increase
        </button>
        <button onClick={() => setCount((draft) => (draft = draft - 1))}>
          Decrease
        </button>
      </>
    )
  }

  const { findByText, getByText } = render(
    <StrictMode>
      <Provider>
        <Parent />
      </Provider>
    </StrictMode>
  )

  await findByText('count: 0')

  fireEvent.click(getByText('Increase'))
  await findByText('count: 1')

  fireEvent.click(getByText('Decrease'))
  await findByText('count: 0')
})
