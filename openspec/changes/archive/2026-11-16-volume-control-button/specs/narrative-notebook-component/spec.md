# Spec Delta

## ADDED Requirements

### Requirement: Page turn sound plays at controlled volume

The narrative notebook component SHALL play page turn sounds through the Audio Manager at the current Sound Effects volume level.

#### Scenario: Page turn uses Audio Manager
- **WHEN** user turns a page in the notebook
- **THEN** the page turn sound is played via Audio Manager with "sfx" category at current SFX volume