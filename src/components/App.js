import DisplayOnResize from './Display';
import Attribution from '.Attribution';
import Heading from './Headings';
import Para from './Para';
import Image from './Image';
import Button from './Button';

const App = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [theme, setTheme] = React.useState('light');
  const dragItem = React.useRef();
  const dragOverItem = React.useRef();

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      let timer;
      window.clearTimeout(timer);
      timer = window.setTimeout(DisplayOnResize(), 500);
    });
  }, []);

  const dragStart = (index) => {
    dragItem.current = index;
  };
 
  const dragEnter = (index) => {
    dragOverItem.current = index;
  };
 
  const dropItem = () => {
    const copyTodoList = [...todoList];
    const dragItemContent = copyTodoList[dragItem.current];
    copyTodoList.splice(dragItem.current, 1);
    copyTodoList.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodoList(copyTodoList);
  };

  const Header = () => {
    const handleToggle = (event) => {
      event.target.checked ? setTheme('dark') : setTheme('light');
    };

    return (
      <header className='header flex-row'>
        <Heading query='h1' className='primary title uppercase' content='todo' />
        <input type='checkbox' className='toggle selectable' checked={theme === 'dark'} onChange={(event) => handleToggle(event)} />
      </header>
    )
  };

  const CreateTodo = () => {
    const [input, setInput] = React.useState('');
    const inputRef = React.useRef(null);

    const handleKeyPress = (event) => {
      event.charCode == 13 ? setInput(inputRef.current.value) : null;
    };

    React.useEffect(() => {
      input != '' ? (setTodoList([...todoList, { id: `${input.slice(0, 3)}`, content: `${input}`, isCompleted: false }]), setCount(count + 1)) : null;
      inputRef.current.value = '';
    }, [handleKeyPress]);

    return (
      <section className='create'>
        <input ref={inputRef} type='text' className='input' placeholder='Create a new todo...' onKeyPress={(event) => handleKeyPress(event)} spellCheck='off' autoComplete='off' />
      </section>
    );
  };

  const DisplayAndFilterTodos = () => {
    const [listFilter, setListFilter] = React.useState('all');

    React.useEffect(() => {
      todoList.map(item => {
        if (item.isCompleted) {
          document.getElementById(item.id).parentElement.classList.remove('pendent');
          document.getElementById(item.id).parentElement.classList.add('completed');
        } else {
          document.getElementById(item.id).parentElement.classList.remove('completed');
          document.getElementById(item.id).parentElement.classList.add('pendent');
        }
      });
    }, [todoList]);

    const handleClick = (ref) => {
      setTodoList(todoList.filter(item => item.id !== ref));
      setCount(count - 1);
    };

    const handleChange = (ref) => {
      setTodoList(todoList.map(item => item.id === ref ? item.isCompleted ? { ...item, isCompleted: false } : { ...item, isCompleted: true } : item));
      document.getElementById(ref).checked ? setCount(count - 1) : setCount(count + 1);
    };

    const clearCompleted = () => {
      setTodoList(todoList.filter(item => !item.isCompleted));
    };

    React.useEffect(() => {
      if (listFilter == 'all') {
        document.querySelectorAll('.pendent, .completed').forEach(item => {
          item.classList.remove('hidden')
        });
        document.querySelectorAll('.active-btn, .completed-btn').forEach(item => {
          item.classList.remove('active')
        });
        document.querySelector('.all-btn').classList.add('active');
      };
      if (listFilter == 'active') {
        document.querySelectorAll('.pendent').forEach(item => {
          item.classList.remove('hidden')
        });
        document.querySelectorAll('.completed').forEach(item => {
          item.classList.add('hidden')
        });
        document.querySelectorAll('.all-btn, .completed-btn').forEach(item => {
          item.classList.remove('active')
        });
        document.querySelector('.active-btn').classList.add('active');
      };
      if (listFilter == 'completed') {
        document.querySelectorAll('.completed').forEach(item => {
          item.classList.remove('hidden')
        });
        document.querySelectorAll('.pendent').forEach(item => {
          item.classList.add('hidden')
        });
        document.querySelectorAll('.active-btn, .all-btn').forEach(item => {
          item.classList.remove('active')
        });
        document.querySelector('.completed-btn').classList.add('active');
      };
    });

    return (
      <>
        <section className='display flex-col'>
          {todoList && todoList.map((item, index) => {
            return (
              <span key={item.id} className='todo flex-row' draggable onDragStart={() => dragStart(index)} onDragEnter={() => dragEnter(index)} onDragEnd={dropItem}>
                <input id={item.id} type='checkbox' className='checkbox selectable' checked={item.isCompleted} onChange={() => handleChange(item.id)} />
                <Para className='primary para' content={item.content} />
                <Image className='close icon selectable' src='./src/images/icon-cross.svg' alt='close icon' onClick={() => handleClick(item.id)} />
              </span>
            )
          })}
          <span className='clas flex-row'>
            <Para className='counter' content={`${count} items left`} />
            <Button type='button' className='btn selectable' content='Clear Completed' onClick={clearCompleted} />
          </span>
        </section>
        <section className='sort flex-row'>
          <Button type='button' className='btn all-btn selectable' content='All' onClick={() => setListFilter('all')} />
          <Button type='button' className='btn active-btn selectable' content='Active' onClick={() => setListFilter('active')} />
          <Button type='button' className='btn completed-btn selectable' content='Completed' onClick={() => setListFilter('completed')} />
        </section>
      </>
    )
  };

  const Footer = () => (
    <footer className='footer center'>
      <Para className='secondary para' content='Drag and drop to reorder list' />
    </footer>
  )

  return (
    <>
      <main id={theme} className='main'>
        <Header />
        <CreateTodo />
        <DisplayAndFilterTodos />
        <Footer />
      </main>
      <Attribution />
    </>
  );
};

export default App;