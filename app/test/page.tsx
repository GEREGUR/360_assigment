import { CardStack } from '@/components/CardStack';

const CARDS = [
  {
    id: 0,
    content:
      'These cards are amazing, I want to use them in my project. Framer motion is a godsend ngl tbh fam 🙏',
  },
  {
    id: 1,
    content:
      'I dont like this Twitter thing, deleting it right away because yolo. Instead, I would like to call it X.com so that it can easily be confused with adult sites.',
  },
  {
    id: 2,
    content:
      'The first rule of Fight Club is that you do not talk about fight club. The second rule of Fight club is that you DO NOT TALK about fight club.',
  },
  {
    id: 3,
    content: 'test card',
  },
];

const TestPage = () => {
  return (
    <div className="h-full">
      <div className="h-full flex items-center justify-center">
        <CardStack items={CARDS} />
      </div>
      {/* <div className="h-full border-t border-2">тут можно тестить свои компоненты, создавая для каждого компонента такой контейнер</div> */}
    </div>
  );
};

export default TestPage;
