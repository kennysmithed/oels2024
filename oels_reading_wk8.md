---
title: Week 8 reading
description: Iterated learning and the evolution of compositional structure
---

## The plan for week 8

For our penultimate paper we'll be reading Beckner et al. (2017), which provides a reanalysis and online replication of Experiment 2 of Kirby, Cornish & Smith (2008) - the 2008 paper started out as a Masters dissertation by Hannah Cornish ([Dr Hannah Cornish](https://www.ed.ac.uk/profile/hannah-cornish) these days), supervised by me and Simon Kirby. Beckner et al. start with a reanalysis of data from our paper, but the more relevant part here is their experiment, a large online iterated artificial language learning experiment. They find, as in the original experiment, that compositional structure develops through this iterated learning process.  

As usual, in this week's practical you'll get a chance to look at a similar experiment in jsPsych, which will involve code from our earlier word learning experiment again but also the infrastructure to run an iterated learning design, which involves manipulating CSV files on the server.

## Reading tasks for this week

Read:
- [Beckner, C., Pierrehumbert, J., & Hay, J. (2017). The emergence of linguistic structure in an online iterated learning task. *Journal of Language Evolution, 2*, 160–176.](https://doi.org/10.1093/jole/lzx001)

A couple of things to note:
- Reading the Kirby et al. (2008) paper might give you some broader context on the hypothesis that motivated us to run this kind of experiment in the first place - it's fairly short, 6 pages, and linked in the references section below. It's been cited over 1200 times now and we are forever banging on about it, despite its flaws!
- Beckner et al. give us a bit of a hard time for our small sample size and very basic stats in the 2008 paper, but I think they are actually pretty gentle! That 2008 paper reports the first experimental study we ran, we had pretty limited resources and didn't really know what we were doing. I was particularly relieved that the results of our Experiment 2 replicated so well.
- Section 1.1.1 of Beckner et al. is a (much more competent) reanalysis of our 2008 data, with fancier stats to handle a non-linear increase in compositionality (i.e. it increases over generations but not at a constant rate) - don't stress if you don't fully follow the statistical method.
- Their experimental method (with a nice hide-and-seek framing for the task, various intermediate attention checks etc) is quite a lot fancier than what we normally do, and certainly fancier than the experiment I have implemented in the practical for this week.

## References

[Kirby, S., Cornish, H., & Smith, K. (2008). Cumulative cultural evolution in the laboratory:An experimental approach to the origins of structure in human language. *Proceedings of the National Academy of Sciences, USA, 105*, 10681-10686.](http://www.lel.ed.ac.uk/~kenny/publications/kirby_08_cumulative.pdf)

## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
