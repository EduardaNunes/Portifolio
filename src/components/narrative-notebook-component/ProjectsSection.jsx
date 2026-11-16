/**
 * ProjectsSection Component
 *
 * Container component for the Projects section with category filter sidebar.
 * Handles navigation between different project categories and manages the
 * two-page project display layout within the notebook.
 *
 * @param {Object} props - Component props
 * @param {Array} props.projects - Array of all projects to display
 * @param {string} props.selectedCategory - Currently selected category filter
 * @param {Object} props.onCategorySelect - Handler for category selection changes
 * @param {Object} props.onPageChange - Handler for page navigation events
 */
import React from 'react'

const ProjectsSection = ({
  projects,
  selectedCategory,
  onCategorySelect,
  onPageChange,
}) => {
  return (
    <div className="projects-section-container">
      {/* Right Category Filter Sidebar */}
      <aside className="category-filter-sidebar">
        <ul className="category-tabs-list">
          {/* IA e Automações */}
          <li className={`category-tab ${selectedCategory === 'IA e Automações' ? 'selected' : ''}`} onClick={() => onCategorySelect?.('IA e Automações')}>
            <span className="category-name">IA e Automações</span>
            <span className="category-count">{projects?.filter(p => p.categoryId === 'IA e Automações')?.length}</span>
          </li>

          {/* Jogos */}
          <li className={`category-tab ${selectedCategory === 'Jogos' ? 'selected' : ''}`} onClick={() => onCategorySelect?.('Jogos')}>
            <span className="category-name">Jogos</span>
            <span className="category-count">{projects?.filter(p => p.categoryId === 'Jogos')?.length}</span>
          </li>

          {/* WebDev */}
          <li className={`category-tab ${selectedCategory === 'WebDev' ? 'selected' : ''}`} onClick={() => onCategorySelect?.('WebDev')}>
            <span className="category-name">WebDev</span>
            <span className="category-count">{projects?.filter(p => p.categoryId === 'WebDev')?.length}</span>
          </li>

          {/* BackEnd */}
          <li className={`category-tab ${selectedCategory === 'BackEnd' ? 'selected' : ''}`} onClick={() => onCategorySelect?.('BackEnd')}>
            <span className="category-name">BackEnd</span>
            <span className="category-count">{projects?.filter(p => p.categoryId === 'BackEnd')?.length}</span>
          </li>
        </ul>

        {/* Empty State for Selected Category */}
        {selectedCategory && !projects?.some(p => p.categoryId === selectedCategory) && (
          <div className="empty-category-state">
            <p>Nenhum projeto nesta categoria / No projects in this category</p>
          </div>
        )}
      </aside>

      {/* Projects Navigation Area */}
      <main className="projects-navigation-area">
        {projects?.map((project) => (
          <React.Fragment key={project.id}>
            {/* Left Page - Metadata */}
            <div className="notebook-page project-left" data-project-id={project.id}>
              <ProjectLeftPage
                title={project.title}
                description={project.description}
                techStack={project.techStack || []}
                repoUrl={project.repoUrl || '#'}
                sourceCodeLink={project.sourceCodeUrl || project.repoUrl}
              />
            </div>

            {/* Right Page - Demo */}
            <div className="notebook-page project-right" data-project-id={project.id}>
              <ProjectRightPage
                thumbnailUrl={project.thumbnailUrl}
                deployUrl={project.deployUrl}
                projectTitle={project.title}
              />
            </div>
          </React.Fragment>
        ))}

        {/* Empty State when no projects selected */}
        {projects?.length === 0 && (
          <div className="no-projects-message">
            <p>Sem projetos para mostrar / No projects to show</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default ProjectsSection
