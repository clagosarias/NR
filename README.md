# New Relic Apdex Board

What you will find in this README:
  - Some insights during the development process.
  - Some assumptions and caveats.
  - Decisions based in performance optimization. **!important**
  - How to start, build and test the project.


## Developing process
### The user interface
I started with the UI because it helps me see what data structure I’ll be using and needing. I will just be using **one index.html** layout with a **single css file** that is the result of processing the `/scss` folder (using Prepros*). The folder includes all scss partials and the index.

I declared some Sass variables but would rather use CSS custom properties (CSS variables basically) whenever possible. (IE11 is not compatible with CSS variables)

Having a look at the grid in the mockups… I don’t really know if the difference in height of each Host card is intended or not. I would consider it to be wrong, I believe there should be consistency between the negative space in the design. Therefore I will implement same-height host cards (which is a step further in the development actually, given the fact that making them have the height of their content would be easier).

It might seem that at 840px wide the UI isn’t behaving exactly as in the mockup *(check **"Screenshot 1.png"**)* . The problem is that the mockup is designed with no scrollbar. If we remove host-elements until there is no scrollbar (like in the mockup) then it behaves exactly as expected.

**I just find it easier and faster to use prepros rather than setting up a whole webpack process to style the Sass files of such a small project. Plus I wanted to have all the time possible for the rest of the challenge.*

### Reading the JSON
Here I made a decision that would later regret, I used the HTML5 Fetch API in order to retrieve the .json file from an absolute public path that was given when serving the project. All because I did not know if I was allowed to transform the json into a js object in order to import it directly. So assumed I wasn’t.

### WebComponents
Wanted to use `CSSStyleSheet()` function with
 `css.replace("@import url('/scripts/components/application-element/application-element.css')")`
 in order to avoid repeating the style tag for each iteration of the component.
But this aproach needed a sketchy polyfill for IE and so ended up working around it by using slots and declaring the style specific for the custom element tag (i.e: host-element).

### Other assumptions and caveats
I asked what would happen if there were, for example, 26 applications with a 100 apdex when calling the getTopAppsByHost (which only shows 25). The response was that I should decide it by myself, so **I decided to show the first 25 applications ordered by apdex and their position in the array.**

I assumed there was no requirement for the DOM to update whenever a new application was inserted.

I assumed there could be insertion of applications with hosts that were not present in the original listing.

And in most cases the testing follows the happy path.

### Performance optimization
I took the perhaps unpopular decision of **only optimizing everything that was going to be rendered** by the project. Therefore the getters of topAppsByHost(returns 25) and the five top apps from each host has a cost of 0(1). This being a result of the mapHosts function sorting the applications list first and then creating a map of hosts with their name as keys. On the other hand, the rest of the methods asked to develop don't use hashmaps in an attempt of having the fastest FMP (first meaningful paint) possible**.

If I did use hashmaps then it would require more memory allocation and the initialization of those maps would cost some time to the FMP, even though after that every method would then have a Big-O of 1.
As the "optimal solution" was not specified in terms of time or space, I tried to find a balance between the two, in which everything renders as fast as possible without consuming much resources.

As a benchmark, in my machine the FMP was occuring at around 130/140ms (the live-server injects code into the html in order to live-reload) with the mapHosts function taking around 13ms, the insertAdjacentHTML function taking around 5ms and the rendering of the elements taking around 8ms. (see **"Screenshot 2.png"**)

**If we wanted to focus on finding the optimal case as in: "Every operation after the initialization has the fastest execution time possible" I would use a structure based in more hashmaps:

    hostsMap = [
	    'host1': {
		    new Host {
			    name,
			    applicationsMap[key: apdex, value: Set[new App{name, version, apdex}]],
			    apdexMap[key: app, value: apdex],
		    }
	    }
    ]
In which case we could avoid the initial sort of the elements in applicationsList.