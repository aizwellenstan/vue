class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :text
      t.boolean :completed, null: false

      t.timestamps
    end

    add_index :todos, :text, unique: true
  end
end
