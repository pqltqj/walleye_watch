# Walleye Watch model rules

This is a teaching model, not a reconstruction of Mistassini Lake. All numeric model parameters below are invented for classroom exploration. Neither the allele symbols nor the size formula are inferred from the walleye paper.

## Individuals and inheritance

- Each cohort starts with 60 individuals. Founders are age 6 model years.
- Each individual has three independent diploid loci. Each locus contains two alleles, represented by G (1) and g (0). Each founder allele has probability 0.5 of being G; the starting frequency is not forced to exactly 50%.
- Sex is sampled independently at birth, with equal probabilities. Sex does not affect size in this simplified model. Real female walleye are often larger; study evidence is therefore separated by sex.
- Each offspring has one randomly selected female and one randomly selected male parent from the survivors. Each parent contributes one randomly sampled allele at each locus. Sampling of parents is with replacement across offspring; some contribute more than others by chance.
- Sixty offspring replace all parents. This is a fixed-size cohort model of inheritance, not a recruitment or sustainable-yield model. If either sex is absent, reproduction stops.
- Mutations and migration are absent. These are simplifications, not claims that these processes do not occur in nature.

## Length and development

Let c be the total G-copy count, from 0 to 6. At birth each fish receives an independent developmental term e = 3(U1 + U2 - 1), where each U is uniform on [0,1). Thus e lies between -3 and +3 cm.

Adult length in cm = (34 + 3c + e) × food multiplier, rounded to 0.1 cm.

Food multipliers: Low 0.78, Normal 1.00, High 1.18. Juvenile length at age 1 is 24% of the unrounded adult target, rounded to 0.1 cm. Grow to adults sets age to 6 and length to the adult target. Intermediate years are not simulated. Growth changes length, never an individual's genotype.

The matched-growth comparison holds fish, genotype, developmental term, sex and age fixed. It changes only food during development. It is a set of alternative developmental histories, not instantaneous shrinking of adults.

## Harvest and reproduction

Harvest happens once per cohort before reproduction. The removal count is round(N × intensity/100), with permitted intensities 20, 40, or 60 percent. No harvest removes zero fish regardless of the intensity menu.

- Random capture: each remaining fish has equal weight.
- Larger fish more likely: each remaining fish's weight is exp((length_cm - 43)/5). One fish is drawn proportionally to these weights, removed, and the draw repeats without replacement until the target count is reached. Weights are relative capture probabilities, not annual mortality rates.
- All remaining adults are eligible parents. Parent sampling and allele transmission introduce genetic drift, including under no harvest.

The cycle is adults → survivors → juveniles of the next generation → adults. Run to generation 6 advances five reproductive cycles from generation 1, then stops at the adult stage. Manual steps allow up to generation 12. Generation 6 is not a prediction for six generations of actual Mistassini walleye.

## Measurements, charts, and repeatability

G frequency is G copies divided by 6N, averaged over three fictional loci. Per-locus frequencies are G copies at that locus divided by 2N. This is not a single-locus Hardy–Weinberg analysis; use the per-locus data for extensions.

Length histograms include the current life stage. Do not interpret the sudden length decrease at birth as an evolutionary trend. The allele trend chart includes adult cohorts only. All phase records, including survivor frequencies, are available in the table and CSV.

A seeded Mulberry32 random generator drives biology. Fish motion uses no biological random draws. The same seed and settings reproduce the same results; different settings share a starting population but can consume random draws differently. Food affects growth only, so matched no-harvest food trials have identical genetic trajectories. Different seeds are independent classroom replicates.

## Scope limits

The model omits overlapping generations, explicit eggs, density dependence, variable recruitment, sex-specific growth and fecundity, habitat structure, non-harvest mortality, and movement between rivers. Fish are shown in a schematic stream; the model is not assigned to a particular river or group of fishers. Its outcomes demonstrate a possible mechanism under stated assumptions, not the cause of the study's observations.

## Source boundary

The body-size patterns, river names, dates, and discussion of knowledge contributions come from Bowles et al. (2020), DOI 10.1111/eva.12987. The displayed study graph is Figure 2, cropped without altering its data, from the supplied CC BY article. No numerical study data have been invented or read off a chart. The 2022 report and published scientific debate appear only in evidence sections. All simulated records are marked Teaching model.
