class Todo < ApplicationRecord
  validates :text, length: { minimum: 5, message: 'must be at least 5 characters' }, uniqueness: { message: 'must be unique' }
end
