import * as React from "react";
import * as ReactDOM from "react-dom"
import * as _ from "lodash";

// import { GestaltComponent } from './GestaltComponent'
// import { SearchAddBox } from './SearchAddBox'
// import { HashtagsBox } from './HashtagsBox'
// import { ListView } from './ListView'

// import { Gestalt, GestaltsMap, GestaltInstancesMap, GestaltInstance, HydratedGestaltInstance } from '../domain';
// import * as Util from '../util';
// import { LazyArray } from "../LazyArray"

// import * as Immutable from 'immutable'
// // import * as ImmutableDiff from 'immutablediff'
// // var ImmutableDiff: any = require("immutablediff");


interface Item {
    v: number;
    w: number;
}

interface ItemsCollection {
    v: number;
    w: number;
    itemsRay: Item[];
}

export interface KnapsackState {
    bestKnapsack?: ItemsCollection
    items?: Item[]
    knapsackMaxWeight?: number
}

export interface KnapsackProps extends React.Props<Knapsack> {

}


export class Knapsack extends React.Component<KnapsackProps, KnapsackState> {
    runTimeout: any = undefined


    constructor(props: KnapsackProps) {
        super(props);
        this.state = {
            bestKnapsack: undefined,
            knapsackMaxWeight: 6,
            items: [
                { v: 1, w: 3 },
                { v: 7, w: 2 },
                { v: 8, w: 3 },
                { v: 1, w: 9 },
            ]
        }

    }

    componentDidMount() {
        this.run()
    }

    doRunTimeout = () => {
        if (this.runTimeout) {
            clearTimeout(this.runTimeout)
        }
        this.runTimeout = setTimeout(() => {
            this.run()
        }, 500);
    }

    run = (): void => {


        let { items, knapsackMaxWeight } = this.state

        if (items === undefined || knapsackMaxWeight === undefined)
            throw new Error()

        let minWeight = _.minBy(items, e => e.w).w



        // let bestWayToMake={}
        let bestValItemsCollectionForWeightLessThanOrEqualTo = (w: number): ItemsCollection => {

            if (items === undefined || knapsackMaxWeight === undefined)
                throw new Error()

            if (w < minWeight) {
                return { itemsRay: [], v: 0, w: 0 }
            }
            else {
                let bestVal = 0;
                let bestItem: Item = { w: 0, v: 0 }

                let bestItemsNMinus1: Item[] = []

                for (let i = 0; i < items.length; i++) {
                    let item = items[i]

                    if (w - item.w < 0) //#hack
                        continue

                    let bestItemsetForNMinus1 = bestValItemsCollectionForWeightLessThanOrEqualTo(w - item.w)
                    let currVal = bestItemsetForNMinus1.v + item.v
                    if (currVal > bestVal) {
                        bestVal = currVal
                        bestItem = item
                        bestItemsNMinus1 = bestItemsetForNMinus1.itemsRay
                    }
                }

                let outBestItems: Item[] = bestItemsNMinus1.concat(bestItem)
                return {
                    itemsRay: outBestItems,
                    v: _.sumBy(outBestItems, e => e.v),
                    w: _.sumBy(outBestItems, e => e.w)
                }

            }
        }

        let out = bestValItemsCollectionForWeightLessThanOrEqualTo(knapsackMaxWeight)

        console.log(out)
        this.setState({ bestKnapsack: out })


        //             let currItem
        //             items.map(e=>)
        //             return _.maxBy(
        //                 bestValForWeight(w - currItem.w) + currItem.v

        //                 items.filter(e=>)
        //             [floorToWeights(w)], e=>e.v)
        //         }
        //         if (w in items) {
        //             return items[w]
        //         }
        //         else {
        //             return bestValForWeight(w - currItem.w) + currItem.v
        //         }

        //         let q = []

        //         for (let n = 0; i < items.length; n++) {
        //         }

        //         let bestVal = 0;

        //         for (let i = 0; i < items.length; i++) {
        //             let item = items[i]
        //             let currVal = bestValForWeight(w - item.w) + item.v

        //             bestVal = 
        //         }
        //     }

        //     let itemsCopy = items.slice() //clone

        //     for (let i = 0; i < items.length; i++) {
        //         for (let i = 0; i < items.length; i++) {

        //         }
        //     }

    }

    render() {



        if (this.state.items === undefined || this.state.knapsackMaxWeight === undefined)
            throw new Error()

        return <div>

            <div>Knapsack size: {this.state.knapsackMaxWeight}
            </div>
            <div>
                Items
            <ul>
                    {this.state.items.map((e, i) => <li><span
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(event) => {
                            if (this.state.items === undefined)
                                throw new Error()

                            this.state.items[i].v = parseInt(event.currentTarget.innerText)
                            this.setState({})
                            this.doRunTimeout();

                        }
                        }>{e.v}</span> ({e.w})</li>)}
                </ul>
            </div>

            <button onClick={this.run} > Run</button>


            {this.state.bestKnapsack ? (
                <div>
                    <div>
                        Total: {this.state.bestKnapsack.v} ({this.state.bestKnapsack.w})
                        </div>
                    Knapsack contents:
                <ul>
                        {this.state.bestKnapsack.itemsRay.map(i => <li>{i.v} ({i.w})</li>)}
                    </ul>


                </div>
            ) :
                null
            }



        </div>


    }
}


export interface EditableSpanState {
}

export interface EditableSpanProps extends React.Props<Knapsack> {
    knapSackToControl:Knapsack
    setNum:(n:number)=>void

}


class EditableSpan extends React.Component<EditableSpanProps, EditableSpanState> {
    runTimeout: any = undefined


    constructor(props: EditableSpanProps) {
        super(props);
    }

    render() {
        return <span
            contentEditable
            suppressContentEditableWarning
            onInput={(event) => {
                this.props.setNum(parseInt(event.currentTarget.innerText))
                this.props.knapSackToControl.setState({})
                this.props.knapSackToControl.doRunTimeout();

            }
            }>{this.props.children}</span>

    }
}