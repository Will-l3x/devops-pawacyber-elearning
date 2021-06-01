import React, {Component} from 'react'
import Header from '../../components/header';
import LeftSidebar from '../../components/LeftSidebar';
import quizQuestions from './quizQuestions'

class QuizApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {},
            result: '',
        }
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount(){
        const shuffledAnswerOptions = quizQuestions.map(question =>
            this.shuffleArray(question.answers)
            
        );
        this.setState({
            question: quizQuestions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        })
    }

    shuffleArray(array){
        var currentIndex = array.length,
        temporaryValue,
        randomIndex;
  
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
  
      return array;
    }

    handleAnswerSelected(event){
        this.setUserAnswer(event.currentTarget.value)
        if (this.state.questionId < quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
          } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
          }
    }

    setUserAnswer(answer) {
        this.setState((state, props) => ({
          answersCount: {
            ...state.answersCount,
            [answer]: (state.answersCount[answer] || 0) + 1
          },
          answer: answer
        }));
      }
    
      setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
    
        this.setState({
          counter: counter,
          questionId: questionId,
          question: quizQuestions[counter].question,
          answerOptions: quizQuestions[counter].answers,
          answer: ''
        });
      }

      getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
    
        return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
      }
    
      setResults(result) {
        if (result.length === 1) {
          this.setState({ result: result[0] });
        } else {
          this.setState({ result: 'Undetermined' });
        }
      }
      renderQuiz() {
        return (
          <Quiz
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
          />
        );
      }

      renderResult() {
        return <Result quizResult={this.state.result} />;
      }

    render() {
        return (
            <div>
                <header id="header" className="page-topbar">
                    <Header />
                </header>
                <main id="main">
                    {" "}
                <LeftSidebar />
                <section id="content">
              <div className="container">
                <div style={{ marginTop: "15px" }}>
                  <div id="card-widgets">
                    <div className="row">
                      <div className="col s12 m12 l3">
                        <div className="column">
                          <ul className="task-card collection with-header">
                          <li
                              className={`collection-header ${course.color} `}
                            >
                              <p className="task-card-title">
                                ICT Exams
                              </p>
                            </li>
                          </ul>
                          {this.state.result ? this.renderResult() : this.renderQuiz()}
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </section>
                
                </main>
                
            </div>
        )
    }
}

export default QuizApp